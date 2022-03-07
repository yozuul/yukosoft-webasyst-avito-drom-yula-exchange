export const getMskTime = () => {
   const date = new Date()
   const msk = date.setHours(date.getHours() + 3);
   return msk
}