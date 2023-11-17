const GITHUB_BASE = "https://few-sw.github.io/near-api-js"

module.exports = {
    "externalSymbolLinkMappings": {
        "providers/provider": {
            "AccessKeyView": `${GITHUB_BASE}/interfaces/near_api_js.providers_provider.AccessKeyView.html`
        },
        "providers/json-rpc-provider": {
            "JsonRpcProvider_sendTransaction": `${GITHUB_BASE}/classes/_near_js_providers.json_rpc_provider.JsonRpcProvider.html#sendTransaction`
        },
        "key_stores/browser_local_storage_key_store": { 
            "BrowserLocalStorageKeyStore": `${GITHUB_BASE}/classes/_near_js_keystores_browser.browser_local_storage_key_store.BrowserLocalStorageKeyStore.html`
        },
        "key_stores/keystore": {
            "KeyStore": `${GITHUB_BASE}/classes/_near_js_keystores.keystore.KeyStore.html`
        },
        "utils/key_pair": {
            "PublicKey": `${GITHUB_BASE}/classes/_near_js_crypto.public_key.PublicKey.html#fromString`,
            "KeyPair": `${GITHUB_BASE}/classes/_near_js_crypto.key_pair.KeyPair.html#fromString`,
        },
        "": {
            "": `${GITHUB_BASE}`
        },
        "": {
            "": `${GITHUB_BASE}`
        },
        "": {
            "": `${GITHUB_BASE}`
        },
        "": {
            "": `${GITHUB_BASE}`
        },
    }
}

// [warning] Failed to resolve link to "walletAccount!WalletConnection" in comment for near-api-js.account.Account.
// [warning] Failed to resolve link to "walletAccount!WalletConnection" in comment for near-api-js.account_multisig.Account2FA.
// [warning] Failed to resolve link to "walletAccount!WalletConnection" in comment for near-api-js.account_multisig.AccountMultisig.