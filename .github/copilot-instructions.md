# GitHub Copilot Instructions for Threads Clone

## Project Overview

This is a Next.js 15 application that clones the Threads social media platform. It uses the App Router, Server Components, and Server Actions for optimal performance.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **File Upload**: UploadThing
- **Form Handling**: React Hook Form + Zod

## Code Style & Best Practices

### Next.js App Router

- Always use Server Components by default; only mark files as "use client" when necessary
- Use async/await in Server Components for data fetching
- Implement proper loading states with loading.tsx files
- Implement error boundaries with error.tsx files
- Use generateMetadata for dynamic SEO metadata
- Leverage route groups with () for logical organization

### TypeScript

- **Never use `any` type** - use proper TypeScript types or unknown/never when appropriate
- Define interfaces for all props and function parameters
- Use type inference where possible but explicit typing for function returns
- Export reusable types from a shared types file

### Server Actions

- Always add "use server" directive at the top of server action files
- Use revalidatePath() or revalidateTag() after mutations
- Implement proper error handling with try-catch blocks
- Return typed responses, avoid throwing errors directly to client
- Use zod for input validation

### Database (MongoDB/Mongoose)

- Always check database connection before operations
- Use lean() for read-only queries to improve performance
- Implement proper indexing on frequently queried fields
- Use select() to limit returned fields
- Avoid N+1 queries with proper populate()
- Use transactions for operations affecting multiple collections

### React Components

- Prefer named exports over default exports for better refactoring
- Use functional components exclusively
- Implement proper prop typing with TypeScript interfaces
- Keep components small and focused (Single Responsibility Principle)
- Extract reusable logic into custom hooks

### Forms

- Use React Hook Form with Zod schema validation
- Implement loading states during form submission
- Display clear error messages
- Use Server Actions for form submissions
- Reset forms after successful submission

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming (defined in globals.css)
- Leverage shadcn/ui components for consistency
- Use clsx or cn utility for conditional classes

### Performance

- Use Next.js Image component for all images
- Implement pagination for large lists
- Use React Suspense with streaming for slow data fetching
- Minimize client-side JavaScript
- Use static generation where possible
- Implement proper caching strategies with fetch options

### Security

- Validate all user inputs with Zod
- Sanitize data before database operations
- Use Clerk proxy for authentication (Next.js 15+)
- Never expose sensitive environment variables to client
- Implement proper CORS policies
- Use prepared statements to prevent injection attacks

### Error Handling

- Use error boundaries for unexpected errors
- Implement graceful fallbacks
- Log errors appropriately (avoid logging in production client-side)
- Return user-friendly error messages
- Use proper HTTP status codes

### File Structure

```
app/
  (auth)/          # Authentication routes
  (root)/          # Main application routes
  api/             # API routes
components/
  cards/           # Card components
  forms/           # Form components
  shared/          # Shared layout components
  ui/              # shadcn/ui components
lib/
  actions/         # Server actions
  models/          # Mongoose models
  validations/     # Zod schemas
constants/         # Application constants
public/            # Static assets
```

## Common Patterns

### Fetching Data in Server Components

```typescript
export default async function Page() {
  const data = await fetchData();

  return <div>{/* render data */}</div>;
}
```

### Server Actions Pattern

```typescript
"use server";

import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  try {
    // Validate input
    const validatedData = schema.parse(formData);

    // Database operation
    await db.create(validatedData);

    // Revalidate cache
    revalidatePath("/path");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create item" };
  }
}
```

### Form Component Pattern

```typescript
"use client";

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});

async function onSubmit(values: z.infer<typeof schema>) {
  const result = await serverAction(values);
  // Handle result
}
```

## Naming Conventions

- **Files**: kebab-case (e.g., user-profile.tsx)
- **Components**: PascalCase (e.g., UserProfile)
- **Functions**: camelCase (e.g., fetchUserData)
- **Constants**: UPPER_SNAKE_CASE (e.g., MAX_FILE_SIZE)
- **Types/Interfaces**: PascalCase with descriptive names (e.g., UserProfileProps)

## Git Commit Messages

- Use conventional commits format
- Examples:
  - `feat: add user profile page`
  - `fix: resolve authentication issue`
  - `refactor: optimize database queries`
  - `docs: update README`

## Environment Variables

Required variables should be documented in .env.example:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- MONGODB_URL
- UPLOADTHING_SECRET
- UPLOADTHING_APP_ID

## Testing Considerations

- Write tests for critical business logic
- Test server actions independently
- Mock database calls in unit tests
- Use React Testing Library for component tests

## Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers

## Code Review Checklist

- [ ] TypeScript types are properly defined (no 'any')
- [ ] Server components used where possible
- [ ] Error handling implemented
- [ ] Loading states provided
- [ ] Responsive design implemented
- [ ] Accessibility considerations met
- [ ] Performance optimizations applied
- [ ] Security best practices followed
