from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

app = FastAPI(title="Zora Intelligence API")

# Middleware для CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ZORA_API_KEY = os.getenv("ZORA_API_KEY")
BASE_URL = "https://api-sdk.zora.engineering"

headers = {
    "Authorization": f"Bearer {ZORA_API_KEY}"
}

# ---------- ROUTES ---------- #

@app.get("/")
def root():
    return {"status": "ok", "message": "Zora backend running"}

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "Service is healthy"}

@app.get("/profiles")
def get_profiles(limit: int = 25):
    """
    Получаем список токенов/коинов Zora через explore endpoint с правильными параметрами
    """
    try:
        # Используем explore endpoint с правильными параметрами из OpenAPI
        url = f"{BASE_URL}/explore"
        print(f"Making SDK request to: {url}")
        print(f"Using API key: {ZORA_API_KEY[:20]}...")
        
        # Параметры согласно OpenAPI документации
        params = {
            "listType": "TOP_VOLUME_24H",  # Один из разрешенных значений
            "count": limit
        }
        
        res = requests.get(url, headers=headers, params=params)
        print(f"Response status: {res.status_code}")
        print(f"Response headers: {dict(res.headers)}")
        print(f"Response text (first 500 chars): {res.text[:500]}")

        if res.status_code != 200:
            print(f"API request failed: {res.status_code}")
            print("Falling back to mock data...")
            raise Exception(f"API request failed: {res.status_code}")

        data = res.json()
        print(f"Successfully parsed JSON response")
        
        profiles = []
        explore_list = data.get("exploreList", {})
        edges = explore_list.get("edges", [])
        
        for edge in edges[:limit]:
            token = edge.get("node", {})
            # Извлекаем соцсети из профиля создателя
            creator_profile = token.get("creatorProfile", {})
            social_accounts = creator_profile.get("socialAccounts", {})
            
            twitter = None
            farcaster = None
            
            if social_accounts.get("twitter"):
                twitter = f"https://twitter.com/{social_accounts['twitter'].get('username', '')}"
            if social_accounts.get("farcaster"):
                farcaster = f"https://warpcast.com/{social_accounts['farcaster'].get('username', '')}"
            
            profile = {
                "address": token.get("address"),
                "name": token.get("name"),
                "description": token.get("description"),
                "tokenTicker": token.get("symbol"),
                "marketCap": float(token.get("marketCap", 0)) if token.get("marketCap") else None,
                "holdersCount": token.get("uniqueHolders", 0),
                "postsCount": int(token.get("totalSupply", 0)) if token.get("totalSupply") else 0,
                "followersCount": token.get("uniqueHolders", 0),  # Используем количество уникальных холдеров
                "followingCount": 0,
                "twitter": twitter,
                "farcaster": farcaster,
                "zoraLink": f"https://zora.co/collect/{token.get('address')}",
                "image": token.get("mediaContent", {}).get("previewImage", {}).get("medium") if token.get("mediaContent") else None,
                "ownerAddress": token.get("creatorAddress"),
                "network": f"Chain {token.get('chainId', 8453)}",
                "totalVolume": float(token.get("totalVolume", 0)) if token.get("totalVolume") else None,
                "volume24h": float(token.get("volume24h", 0)) if token.get("volume24h") else None,
                "creatorHandle": creator_profile.get("handle") if creator_profile else None
            }
            profiles.append(profile)
        
        print(f"Got {len(profiles)} tokens from SDK API")
        return {"count": len(profiles), "profiles": profiles}
        
    except Exception as e:
        print(f"Error making REST request: {e}")
        print("Falling back to mock data...")
    
    # Моковые данные для демонстрации
    mock_profiles = [
        {
            "address": "0x1234567890abcdef1234567890abcdef12345678",
            "name": "Crypto Artist",
            "description": "Digital artist creating unique NFT collections",
            "tokenTicker": "ART",
            "marketCap": 1500000,
            "holdersCount": 250,
            "postsCount": 45,
            "followersCount": 1200,
            "followingCount": 300,
            "twitter": "cryptoartist",
            "farcaster": "cryptoartist",
            "zoraLink": "https://zora.co/0x1234567890abcdef1234567890abcdef12345678"
        },
        {
            "address": "0x2345678901bcdef1234567890abcdef123456789",
            "name": "DeFi Builder",
            "description": "Building the future of decentralized finance",
            "tokenTicker": "DEFI",
            "marketCap": 850000,
            "holdersCount": 180,
            "postsCount": 32,
            "followersCount": 950,
            "followingCount": 200,
            "twitter": "defibuilder",
            "farcaster": "defibuilder",
            "zoraLink": "https://zora.co/0x2345678901bcdef1234567890abcdef123456789"
        },
        {
            "address": "0x3456789012cdef1234567890abcdef1234567890",
            "name": "NFT Collector",
            "description": "Curating the best NFT collections",
            "tokenTicker": "COLLECT",
            "marketCap": 3200000,
            "holdersCount": 420,
            "postsCount": 78,
            "followersCount": 2100,
            "followingCount": 500,
            "twitter": "nftcollector",
            "farcaster": "nftcollector",
            "zoraLink": "https://zora.co/0x3456789012cdef1234567890abcdef1234567890"
        },
        {
            "address": "0x4567890123def1234567890abcdef1234567890a",
            "name": "Web3 Developer",
            "description": "Creating innovative blockchain solutions",
            "tokenTicker": "WEB3",
            "marketCap": 750000,
            "holdersCount": 150,
            "postsCount": 28,
            "followersCount": 800,
            "followingCount": 180,
            "twitter": "web3dev",
            "farcaster": "web3dev",
            "zoraLink": "https://zora.co/0x4567890123def1234567890abcdef1234567890a"
        },
        {
            "address": "0x5678901234ef1234567890abcdef1234567890ab",
            "name": "Metaverse Creator",
            "description": "Building immersive virtual worlds",
            "tokenTicker": "META",
            "marketCap": 2100000,
            "holdersCount": 320,
            "postsCount": 55,
            "followersCount": 1500,
            "followingCount": 400,
            "twitter": "metaversecreator",
            "farcaster": "metaversecreator",
            "zoraLink": "https://zora.co/0x5678901234ef1234567890abcdef1234567890ab"
        },
        {
            "address": "0x6789012345f1234567890abcdef1234567890abc",
            "name": "DAO Leader",
            "description": "Leading decentralized autonomous organizations",
            "tokenTicker": "DAO",
            "marketCap": 1200000,
            "holdersCount": 200,
            "postsCount": 38,
            "followersCount": 1100,
            "followingCount": 250,
            "twitter": "daoleader",
            "farcaster": "daoleader",
            "zoraLink": "https://zora.co/0x6789012345f1234567890abcdef1234567890abc"
        },
        {
            "address": "0x78901234561234567890abcdef1234567890abcd",
            "name": "Crypto Trader",
            "description": "Professional cryptocurrency trading",
            "tokenTicker": "TRADE",
            "marketCap": 450000,
            "holdersCount": 90,
            "postsCount": 22,
            "followersCount": 600,
            "followingCount": 120,
            "twitter": "cryptotrader",
            "farcaster": "cryptotrader",
            "zoraLink": "https://zora.co/0x78901234561234567890abcdef1234567890abcd"
        },
        {
            "address": "0x8901234567234567890abcdef1234567890abcde",
            "name": "Blockchain Researcher",
            "description": "Researching next-generation blockchain technology",
            "tokenTicker": "RESEARCH",
            "marketCap": 1800000,
            "holdersCount": 280,
            "postsCount": 65,
            "followersCount": 1300,
            "followingCount": 350,
            "twitter": "blockchainresearch",
            "farcaster": "blockchainresearch",
            "zoraLink": "https://zora.co/0x8901234567234567890abcdef1234567890abcde"
        }
    ]
    
    return {"count": len(mock_profiles), "profiles": mock_profiles}

@app.get("/profile/{address}")
def get_profile(address: str):
    """
    Получаем подробную информацию по конкретному адресу
    """
    try:
        url = f"{BASE_URL}/profiles/{address}"
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            return {"error": "Profile not found"}
        
        p = res.json().get("data", {})
        profile = {
            "address": p.get("address"),
            "name": p.get("name"),
            "description": p.get("bio"),
            "tokenTicker": p.get("token", {}).get("symbol"),
            "marketCap": p.get("token", {}).get("marketCapUsd"),
            "holdersCount": p.get("token", {}).get("holdersCount"),
            "postsCount": p.get("postsCount"),
            "followersCount": p.get("followersCount"),
            "followingCount": p.get("followingCount"),
            "twitter": p.get("socials", {}).get("twitter"),
            "farcaster": p.get("socials", {}).get("farcaster"),
            "zoraLink": f"https://zora.co/{p.get('address')}"
        }
        return profile
    except Exception as e:
        return {"error": f"Failed to fetch profile: {e}"}

@app.get("/holders/{token_address}")
def get_token_holders(token_address: str, limit: int = 10):
    """
    Получаем список холдеров токена через SDK API
    """
    try:
        url = f"{BASE_URL}/coinHolders"
        params = {
            "chainId": 8453,  # Base chain
            "address": token_address,
            "count": limit
        }
        
        res = requests.get(url, headers=headers, params=params)
        if res.status_code != 200:
            return {"error": res.text}

        data = res.json()
        token_balances = data.get("zora20Token", {}).get("tokenBalances", {})
        edges = token_balances.get("edges", [])
        
        holders = []
        for edge in edges:
            node = edge.get("node", {})
            holder = {
                "address": node.get("ownerAddress"),
                "balance": node.get("balance"),
                "percent": None,  # SDK не возвращает процент напрямую
                "handle": node.get("ownerProfile", {}).get("handle") if node.get("ownerProfile") else None
            }
            holders.append(holder)
        
        return {"count": len(holders), "holders": holders}
    except Exception as e:
        return {"error": f"Failed to fetch holders: {e}"}