'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createSession } from '../../lib/sessions';

import { auth } from '../../firebaseConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // const token = await user.getIdToken();
      await createSession(
        user.stsTokenManager.accessToken,
        user.stsTokenManager.refreshToken,
      );
      setLoading(false);
      router.push('/menu');
    } catch {
      setLoading(false);
      setError('Wrong login or password');
    }
  };

  return (
    <section className="w-screen h-[100dvh] flex items-center justify-center">
      <div className="bg-gray-600/40 w-[400px] max-sm:w-[90vw] rounded-md p-4 flex flex-col items-center">
        <h1 className="w-full text-center p-4 text-2xl">LOGIN</h1>

        <TextField
          id="login-input"
          color="secondary"
          error={error}
          label="Login"
          variant="outlined"
          sx={{
            width: '80%',
            paddingTop: '4px',
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #fff inset',
              WebkitTextFillColor: 'black',
            },
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />

        <TextField
          id="password-input"
          label="Password"
          type="password"
          error={error}
          color="secondary"
          variant="outlined"
          sx={{
            width: '80%',
            marginTop: '10px',
            '& .MuiInputBase-input': {
              color: 'white', // колір тексту
            },
            '& .MuiInputLabel-root': {
              color: 'gray', // колір лейбла
            },
          }}
          value={password}
          onChange={(e) => {
            setError('');
            setPassword(e.target.value);
          }}
        />
        <div className="py-4 w-full text-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            sx={{ width: '80%' }}
          >
            {loading ? 'Submitting...' : 'Login'}
          </Button>
        </div>

        {/* <button onClick={handleLogin}>Login</button> */}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </section>
  );
}
