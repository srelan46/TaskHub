export function RegisterForm({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  email,
  onEmailChange,
  firstname,
  onFirstNameChange,
  lastname,
  onLastNameChange,
  children,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  firstname: string;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastname: string;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="user@email.com"
          autoComplete="email"
          value={email}
          onChange={onEmailChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
        />
      </div>
      <div>
        <label
          htmlFor="Username"
          className="block text-xs text-gray-600 uppercase"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="username"
          placeholder="username"
          value={username}
          onChange={onUsernameChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
        />
      </div>
      <div>
        <label
          htmlFor="firstname"
          className="block text-xs text-gray-600 uppercase"
        >
          First Name
        </label>
        <input
          id="firstname"
          name="firstname"
          type="firstname"
          placeholder="John"
          value={firstname}
          onChange={onFirstNameChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
        />
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-xs text-gray-600 uppercase"
        >
          Last Name
        </label>
        <input
          id="lastname"
          name="lastname"
          type="lastname"
          placeholder="Doe"
          value={lastname}
          onChange={onLastNameChange}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
        />
      </div>
      {children}
    </form>
  );
}