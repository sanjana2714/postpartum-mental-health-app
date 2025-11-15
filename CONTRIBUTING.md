# Contributing to Postpartum Mental Health App

Thank you for your interest in contributing to the Postpartum Mental Health App! This document provides guidelines for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for everyone. We expect all contributors to:

- Be respectful and considerate in communication
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

There are many ways to contribute to this project:

1. **Report Bugs** - Help us identify and fix issues
2. **Suggest Features** - Share ideas for new functionality
3. **Improve Documentation** - Fix typos, clarify instructions, add examples
4. **Submit Code** - Fix bugs or implement new features
5. **Review Pull Requests** - Provide feedback on submitted code

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL
- Git
- Expo CLI (for mobile development)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Mobile App Setup
```bash
cd mobile-app
npm install
npm start
```

See [README.md](./README.md) for detailed setup instructions.

## Coding Standards

### JavaScript/React Native
- Use ES6+ syntax
- Use functional components with hooks
- Follow Airbnb JavaScript Style Guide
- Use meaningful variable and function names
- Keep functions small and focused (< 50 lines)
- Add comments for complex logic

### Backend API
- Use RESTful conventions
- Return consistent error responses
- Use HTTP status codes correctly
- Validate all inputs
- Handle errors gracefully
- Write descriptive endpoint documentation

### Mobile App
- Follow React Native best practices
- Use StyleSheet for styling
- Keep components reusable
- Implement proper error boundaries
- Test on both iOS and Android
- Consider accessibility

## Commit Guidelines

We follow the Conventional Commits specification:

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat(auth): add JWT refresh token functionality

- Implement refresh token generation
- Add refresh endpoint to auth routes
- Update middleware to handle token refresh

Closes #123
```

```
fix(mood): correct streak calculation for timezone differences

The streak calculation was not accounting for user timezones,
causing incorrect streak counts for users in different regions.

Fixes #456
```

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise code
   - Add comments where necessary
   - Update documentation if needed

3. **Test your changes**
   - Ensure all existing tests pass
   - Add new tests for new functionality
   - Test manually on different devices/environments

4. **Commit your changes**
   - Follow commit message guidelines
   - Make atomic commits (one logical change per commit)

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues
   - Add screenshots for UI changes
   - Ensure CI checks pass

7. **Respond to feedback**
   - Address reviewer comments
   - Make requested changes
   - Keep discussion constructive

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Screenshots added (for UI changes)
- [ ] Commit messages follow guidelines

## Reporting Bugs

When reporting bugs, please include:

1. **Clear title** - Describe the issue briefly
2. **Description** - Explain the problem in detail
3. **Steps to reproduce** - List exact steps to recreate the issue
4. **Expected behavior** - What should happen
5. **Actual behavior** - What actually happens
6. **Environment** - OS, browser, device, app version
7. **Screenshots** - If applicable
8. **Logs** - Any error messages or console output

### Bug Report Template
```markdown
**Bug Description:**
A clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- Device: [e.g., iPhone 14, Android Pixel 6]
- OS: [e.g., iOS 17, Android 13]
- App Version: [e.g., 1.0.0]
- Backend Version: [e.g., 1.0.0]

**Screenshots:**
If applicable, add screenshots.

**Additional Context:**
Any other relevant information.
```

## Suggesting Features

When suggesting features, please:

1. **Check existing issues** - Your idea might already be proposed
2. **Be specific** - Clearly describe the feature
3. **Explain the value** - Why is this feature needed?
4. **Consider alternatives** - Are there other solutions?
5. **Think about implementation** - Any technical considerations?

### Feature Request Template
```markdown
**Feature Title:**
Brief title for the feature

**Problem Statement:**
What problem does this solve?

**Proposed Solution:**
Describe your proposed solution

**Alternative Solutions:**
What alternatives have you considered?

**Additional Context:**
Any other relevant information, mockups, or examples
```

## Development Workflow

### Creating a New Feature

1. **Discuss first** - Open an issue to discuss large changes
2. **Create branch** - Branch from `main`
3. **Implement** - Make your changes
4. **Test** - Thoroughly test your changes
5. **Document** - Update relevant documentation
6. **Submit PR** - Create pull request with clear description

### Reviewing Pull Requests

When reviewing PRs:

- Be constructive and respectful
- Focus on code quality and maintainability
- Check for potential bugs or edge cases
- Verify documentation is updated
- Test the changes if possible
- Approve or request changes with clear feedback

## Questions?

If you have questions:

- Check the [README.md](./README.md)
- Read the [documentation guides](./INTEGRATION_GUIDE.md)
- Open an issue with the "question" label
- Contact the maintainers

## Recognition

Contributors will be:
- Listed in project documentation
- Acknowledged in release notes
- Appreciated for their valuable contributions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Postpartum Mental Health App! Your efforts help support mothers' mental health worldwide. 💙
