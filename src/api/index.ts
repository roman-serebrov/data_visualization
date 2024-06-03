export const getData = async (url: string) => {
    const respons = await fetch(url);
    if(respons.ok) {
        return respons.json();
    }
    return null;
}