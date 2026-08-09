import { useState } from 'react';
import type { FormEvent } from 'react';

type EmailSignupProps = {
  variant?: 'hero' | 'section';
  id?: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailSignup({ variant = 'section', id }: EmailSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const isHero = variant === 'hero';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage('You’re in. New frequencies land in your inbox first.');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <div
      id={id}
      className={
        isHero
          ? 'mt-8 w-full max-w-md mx-auto'
          : 'w-full max-w-xl mx-auto rounded-2xl border border-primary/30 bg-black/60 p-6 md:p-8 shadow-[0_0_30px_rgba(0,207,255,0.12)]'
      }
    >
      {!isHero && (
        <div className="text-center mb-6">
          <p className="font-orbitron text-primary text-sm uppercase tracking-[0.2em] mb-2">
            Free drop
          </p>
          <h3 className="font-orbitron text-2xl md:text-3xl neon-text mb-2">
            Get new frequencies first
          </h3>
          <p className="text-white/75 text-sm md:text-base">
            Exclusive unreleased tracks + early access. No spam — just signal.
          </p>
        </div>
      )}

      {isHero && (
        <p className="font-orbitron text-xs md:text-sm uppercase tracking-[0.18em] text-primary/90 mb-3">
          Get new frequencies first
        </p>
      )}

      {status === 'success' ? (
        <p
          className={`rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm md:text-base text-primary ${
            isHero ? 'text-center' : 'text-center'
          }`}
          role="status"
        >
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div className={`grid gap-3 ${isHero ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
            <label className="sr-only" htmlFor={`signup-name-${variant}`}>
              Name
            </label>
            <input
              id={`signup-name-${variant}`}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-neon"
              maxLength={80}
            />
            <label className="sr-only" htmlFor={`signup-email-${variant}`}>
              Email
            </label>
            <input
              id={`signup-email-${variant}`}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-neon"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Joining…' : 'Join the Frequency List'}
          </button>

          {status === 'error' && (
            <p className="text-secondary text-sm text-center" role="alert">
              {message}
            </p>
          )}

          <p className="text-white/45 text-xs text-center">
            Unsubscribe anytime. By joining you agree to our{' '}
            <a href="/privacy.html" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
