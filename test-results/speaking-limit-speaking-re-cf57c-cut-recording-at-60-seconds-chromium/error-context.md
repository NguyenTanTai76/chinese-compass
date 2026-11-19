# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: speaking-limit.spec.ts >> speaking recorder 5-minute limit >> shows 5-minute limit in UI and does not cut recording at 60 seconds
- Location: tests\speaking-limit.spec.ts:48:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\LENOVO\AppData\Local\ms-playwright\chromium_headless_shell-1255\chrome-headless-shell-win64\chrome-headless-shell.exe
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```