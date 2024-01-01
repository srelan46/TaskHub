export function RegisterForm({
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        action={action}
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
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
            <label
            htmlFor="first_name"
            className="block text-xs text-gray-600 uppercase"
          >
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="first_name"
            placeholder="John"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
            <label
            htmlFor="last_name"
            className="block text-xs text-gray-600 uppercase"
          >
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="last_name"
            placeholder="Doe"
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm text-black"
          />
        </div>
        {children}
      </form>
    );
  }