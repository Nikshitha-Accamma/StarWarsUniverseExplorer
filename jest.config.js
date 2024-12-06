/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Adjusted regex for TypeScript files (tsx, ts)
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/', // Ensure axios is transformed
    ],
    moduleNameMapper: {
        '^react-router-dom$': require.resolve('react-router-dom'), // Correct module resolution
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Ensure jest recognizes .ts and .tsx files
    preset: 'ts-jest/presets/js-with-ts', // Make sure ts-jest uses the correct preset
};
