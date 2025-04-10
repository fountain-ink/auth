import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { toBytes } from 'viem/utils'
import { keccak256 } from 'viem/utils'

const privateKey = generatePrivateKey()
const account = privateKeyToAccount(privateKey)

console.log('Private Key: ', privateKey)
console.log('Address: ', account.address)

const secret = keccak256(toBytes(privateKey))

console.log('Derived secret:', secret)

const shortSecret = secret.slice(2, 18)
console.log('Short secret:', shortSecret)
console.log('Update the .env values of PRIVATE_KEY and API_SECRET with the values above (use the full secret or the short secret for api)')
