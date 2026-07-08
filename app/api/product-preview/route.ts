import { NextResponse } from "next/server";

import * as cheerio from "cheerio";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const { url } = body;
    try {
  new URL(url);
} catch {
  return NextResponse.json(
    {
      error: "Invalid URL",
    },
    {
      status: 400,
    }
  );
}

const parsedUrl =
  new URL(url);

const hostname =
  parsedUrl.hostname
    .replace("www.", "");

const store =
  hostname.split(".")[0];

const blockedDomains = [
  "youtube.com",
  "youtu.be",
  "instagram.com",
  "tiktok.com",
  "twitter.com",
  "x.com",
];

if (
  blockedDomains.some((d) =>
    url.includes(d)
  )
) {
  return NextResponse.json(
    {
      error:
        "Unsupported product link",
    },
    {
      status: 400,
    }
  );
}

    if (!url) {
      return NextResponse.json(
        {
          error:
            "URL required",
        },
        {
          status: 400,
        }
      );
    }

  const response =
  await fetch(url, {
    cache: "no-store",
     headers: {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",

  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",

  "Accept-Language":
    "en-US,en;q=0.9",
},
      });

    const html =
      await response.text();
      const priceMatch =
  html.match(
    /"price":"([^"]+)"/
  );

const rawScriptPrice =
  priceMatch?.[1] || "";

const $ = cheerio.load(
  html
);

const amazonPrice =
  $("#corePrice_feature_div .a-offscreen")
    .first()
    .text()
    .trim() ||

  $(".a-price .a-offscreen")
    .first()
    .text()
    .trim() ||

  "";

let jsonLdPrice = "";
let currency = "TRY";
let jsonLdTitle = "";
if (hostname.includes("amazon")) {
  if (hostname.includes(".com")) {
    currency = "USD";
  }

  if (hostname.includes(".de")) {
    currency = "EUR";
  }

  if (hostname.includes(".co.uk")) {
    currency = "GBP";
  }
}

$('script[type="application/ld+json"]').each(
  (_, el) => {
    try {
      const json = JSON.parse(
        $(el).html() || "{}"
      );
      if (json.name) {
  jsonLdTitle = json.name;
}

if (
  Array.isArray(json) &&
  json[0]?.name
) {
  jsonLdTitle =
    json[0].name;
}

   if (json.offers?.price) {
  jsonLdPrice =
    String(json.offers.price);

  if (
    json.offers.priceCurrency
  ) {
    currency =
      String(
        json.offers.priceCurrency
      );
  }
}

   if (
  Array.isArray(json) &&
  json[0]?.offers?.price
) {
  jsonLdPrice =
    String(
      json[0].offers.price
    );

  if (
    json[0]?.offers
      ?.priceCurrency
  ) {
    currency =
      String(
        json[0].offers
          .priceCurrency
      );
  }
}
    } catch {}
  }
);
    let title =
  jsonLdTitle

  $('meta[property="og:title"]').attr(
    "content"
  ) ||

  $("title").text() ||

  "";

title = title
  .replace(/\s+/g, " ")
  .replace(/\s-\sfiyatı.*$/i, "")
  .replace(/\s\|\s.*$/i, "")
  .replace(/\s-\strendyol.*$/i, "")
  .replace(/\s-\shepsiburada.*$/i, "")
  .replace(/\s-\samazon.*$/i, "")
  .replace(/\s-\sn11.*$/i, "")
  .trim();

if (
  !title ||
  title.length < 4
) {
  title =
    "Unsupported Product";
}

let image = "";

const amazonImage =
  $("#landingImage").attr("data-old-hires") ||
  $("#landingImage").attr("src");

image =
  amazonImage ||

  $('meta[property="og:image"]').attr(
    "content"
  ) ||

  $('meta[name="twitter:image"]').attr(
    "content"
  ) ||

  $('img[data-test-id="default-image"]').attr(
    "src"
  ) ||

  $(".swiper-slide img")
    .first()
    .attr("src") ||

  $("picture img")
    .first()
    .attr("src") ||

  "";

if (
  image &&
  image.startsWith("//")
) {
  image = "https:" + image;
}

if (
  image &&
  image.startsWith("/")
) {
  const parsedUrl = new URL(url);

  image =
    parsedUrl.origin + image;
}

let price =
  jsonLdPrice ||

  rawScriptPrice ||

  amazonPrice ||

  $('meta[property="product:price:amount"]')
    .attr("content") ||

  $('meta[itemprop="price"]')
    .attr("content") ||

  $('[data-test-id="price-current-price"]')
    .first()
    .text() ||

  "";



price = price
  .replace(/\u00A0/g, " ")
  .replace(/\s+/g, " ")
  .replace(/[^\d.,]/g, "")
  .trim();

  price = price
  .replace(/\u00A0/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const fullpricematch =
  price.match(
    /\d{1,3}(?:\.\d{3})*(?:,\d{2})/
  );

if (fullpricematch) {
  price = fullpricematch[0];
}

if (
  !title ||
  title ===
    "Unsupported Product"
) {
  return NextResponse.json(
    {
      error:
        "We couldn't find this product automatically. You can still add it manually.",
      manual: true,
    },
    {
      status: 400,
    }
  );
}

if (!image) {
  image =
    "/placeholder-product.png";
}


let galleryImages: string[] = [];

if (hostname.includes("amazon")) {
  galleryImages = [
    ...new Set(
      $("#altImages img")
        .map((_, el) => {
          let src = $(el).attr("src");

          if (!src) return null;

          src = src.replace(
            /\._.*_\./,
            "._SL1500_."
          );

          if (src.startsWith("//")) {
            src = "https:" + src;
          }

          return src;
        })
        .get()
        .filter(Boolean) as string[]
    ),
  ];
}

if (galleryImages.length === 0) {
  galleryImages = [
    ...new Set(
      $("img")
        .map((_, el) => {
          let src =
            $(el).attr("src") ||
            $(el).attr("data-src") ||
            $(el).attr("data-old-hires");

          if (!src) return null;

          if (src.startsWith("//")) {
            src = "https:" + src;
          }

          if (src.startsWith("/")) {
            src =
              parsedUrl.origin + src;
          }

          return src;
        })
        .get()
        .filter(
          (src) =>
            src &&
            src.startsWith("http") &&
            !src.includes("logo") &&
            !src.includes("icon") &&
            !src.includes("avatar") &&
            !src.includes("banner") &&
            !src.includes("sprite") &&
            !src.includes("favicon")
        ) as string[]
    ),
  ];
}

galleryImages = galleryImages.slice(0, 12);
if (
  price &&
  !price.includes(",") &&
  price.includes(".")
) {
  const numeric =
    Number(price);

  if (!Number.isNaN(numeric)) {
    price =
      numeric.toLocaleString(
        "tr-TR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
  }
}
console.log({
  rawScriptPrice,
  jsonLdPrice,
  finalPrice: price,
});
return NextResponse.json({
  title,
  image:
    image ||
    galleryImages[0],
  galleryImages,
  price,
  currency,
  store,
  domain: hostname,
  url,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch product",
      },
      {
        status: 500,
      }
    );
  }
}