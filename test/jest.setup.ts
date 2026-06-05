// This will always mock firebase in all tests
jest.mock('../src/config/firebaseConfig', () => ({
    db: {
        collection: jest.fn(),
        doc: jest.fn(),
    },
}));

// Resets all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});