

export const FechData = async (
  url,
  token,
  method,
  setData,
  setLoading,
  body
) => {
  let form = {};
  const words = ["promoteToAdmin"];

  try {
    if (body !== undefined) {
      form = { ...body };

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setData !== undefined ? setData(data) : null;
      setLoading(false);
    }
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!url.includes(words[0])) {
      const data = await res.json();
      setData !== undefined ? setData(data) : null;
      setLoading(false);
    }
    setLoading(false);
  } catch (e) {

    throw new Error("Ha ocurrido un error:", e);
  }
};
