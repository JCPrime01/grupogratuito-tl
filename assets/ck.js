export default async function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();

  const botUAs = [
    "facebookexternalhit", "facebot", "facebookbot",
    "adsbot", "googlebot", "bingbot", "twitterbot",
    "linkedinbot", "slackbot", "whatsapp", "telegrambot",
    "crawler", "spider", "headless", "phantom", "python",
    "curl", "wget", "java/", "apache-httpclient"
  ];

  const metaIPs = [
    "66.220.", "69.63.", "69.171.", "173.252.",
    "31.13.", "157.240.", "179.60.", "204.15."
  ];

  const isBot = botUAs.some(b => ua.includes(b));
  const isMeta = metaIPs.some(r => ip.startsWith(r));

  if (isBot || isMeta) {
    res.writeHead(302, { Location: "https://esportiva.bet.br" });
    res.end();
    return;
  }        
                                                                                                                                                                                           
    res.writeHead(302, { Location: 'https://go.aff.esportiva.bet/6j30imbu?campaign_id=7181&shareCode=IOW718QF83V&afp1=boost' });                                                                              
    res.end();                                                                                                                                                                             
  }
