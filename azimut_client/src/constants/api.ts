const base = process.env.REACT_APP_API_BASE;

if (!base) {
  throw new Error("REACT_APP_API_BASE is not defined in your environment");
}

export const API_URLS = {
  targets: `${base}/targets`,
  stream: base.replace("http", "ws") + "/stream"
};
