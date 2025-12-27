# SSL Directory

This directory contains SSL certificates for HTTPS support.

## Required Files

- `cert.pem` - SSL Certificate (fullchain)
- `key.pem` - Private Key

## How to Get SSL Certificates

### Option 1: Let's Encrypt (Free, Recommended)

```bash
sudo certbot certonly --standalone -d store.neverlandstudio.my.id
sudo cp /etc/letsencrypt/live/store.neverlandstudio.my.id/fullchain.pem ./cert.pem
sudo cp /etc/letsencrypt/live/store.neverlandstudio.my.id/privkey.pem ./key.pem
chmod 644 cert.pem
chmod 600 key.pem
```

### Option 2: Cloudflare Origin Certificate

1. Login to Cloudflare Dashboard
2. SSL/TLS → Origin Server → Create Certificate
3. Copy and save as `cert.pem` and `key.pem`

### Option 3: Self-Signed (Development Only)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem \
  -out cert.pem \
  -subj "/CN=store.neverlandstudio.my.id"
```

## Security

**IMPORTANT:**
- Never commit actual SSL certificates to git
- This directory is git-ignored
- Keep `key.pem` secure (chmod 600)
- Renew certificates before expiry

## File Structure

```
ssl/
├── cert.pem          # SSL certificate (public)
├── key.pem           # Private key (KEEP SECRET!)
└── README.md         # This file
```
