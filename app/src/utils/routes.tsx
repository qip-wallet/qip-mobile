
// readonly
const base = {
    tabs: "/(tabs)",
    auth: "/auth",
};

export const appRoutes = {
    tabs: {
        home: `${base.tabs}/dashboard/1`,
        settings: `${base.tabs}/dashboard/2`,
        browse: `${base.tabs}/dashboard/3`,
        advance: `${base.tabs}/dashboard/4`,
    },
    auth: {
        password: `${base.auth}/password`,
        generatePassphrase: `${base.auth}/passphrase/generate`,
        confirmPassphrase: `${base.auth}/passphrase/confirm`,
        chooseAddress: `${base.auth}/address`,
        login: `${base.auth}/login`
    }
}


// "/auth/passphrase/enter"