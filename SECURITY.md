# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within Nova UI, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email: **security@nova-ui.dev** (or open a private security advisory on GitHub)

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix**: Depends on severity, typically within 2 weeks for critical issues

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |
| < Latest | ❌       |

## Security Best Practices

Nova UI follows these security practices:

- Minimal dependencies
- Regular dependency audits via `npm audit`
- No unsafe innerHTML usage
- Input validation on component configurations
- Automated security scanning in CI
