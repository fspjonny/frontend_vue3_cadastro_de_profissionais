const getPicture = (gender, id) => {
  // randomuser.me tem limite de 99 imagens por sexo
  const idLow = Math.floor(Math.random() * 99)

  if(id <= 99){
      if(gender === "Masculino") {
          return `https://randomuser.me/api/portraits/men/${id}.jpg`
      } else {
          return `https://randomuser.me/api/portraits/women/${id}.jpg`
      }
  } else { //ID's cadastrados acima de 100, vão receber imagens aleatórias
      if(gender === "Masculino") {
          return `https://randomuser.me/api/portraits/men/${idLow}.jpg`
      } else {
          return `https://randomuser.me/api/portraits/women/${idLow}.jpg`
      }
  }
}

export default getPicture