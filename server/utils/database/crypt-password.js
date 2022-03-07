import { Buffer } from 'buffer'
const { createCipheriv, createDecipheriv } = await import('crypto');

const algorithm = process.env.PASS_ALGORITM_HASH
const secretKey = process.env.PASS_SECRET_KEY
const aad = Buffer.from('0123456789', 'hex')
const nonce = Buffer.from('123456789101')

class Crypt {
    encrypt(password) {
      const cipher = createCipheriv(algorithm, secretKey, nonce, {
        authTagLength: 16
      })
      cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(password)
      })
      const ciphertext = cipher.update(password, 'utf8')
      cipher.final()
      const tag = cipher.getAuthTag()
      const hash = this.concatBuffer(ciphertext, tag)
      return hash
    }

    decrypt(data) {
        const { ciphertext, tag } = this.splitBuffer(data)
        const decipher = createDecipheriv(algorithm, secretKey, nonce, {
            authTagLength: 16
          })
          decipher.setAuthTag(tag)
          decipher.setAAD(aad, {
            plaintextLength: ciphertext.length
          })
          const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');
          try {
            decipher.final()
            return receivedPlaintext
          } catch (err) {
            console.error('Ошибка дехеширования')
            return
          }
    }

    compare(sendPassword, realPassword) {
      if(this.encrypt(sendPassword) !== realPassword) return false
      return true
    }
    concatBuffer(ciphertext, tag) {
        return `${ciphertext.toString('hex')}&${tag.toString('hex')}`
    }
    splitBuffer(data) {
        const hashes = data.split('&')
        return {
            ciphertext: Buffer.from(hashes[0], 'hex'),
            tag: Buffer.from(hashes[1], 'hex'),
        }
    }
}

export const HashPassword = new Crypt()