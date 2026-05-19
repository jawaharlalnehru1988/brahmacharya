console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);
console.log('OPENAI_API_KEY present:', !!process.env.OPENAI_API_KEY);
console.log('CLAUDE_API_KEY present:', !!process.env.CLAUDE_API_KEY);
console.log('ANTHROPIC_API_KEY present:', !!process.env.ANTHROPIC_API_KEY);
console.log('All env keys:', Object.keys(process.env).filter(k => k.toLowerCase().includes('key') || k.toLowerCase().includes('api') || k.toLowerCase().includes('token')));
