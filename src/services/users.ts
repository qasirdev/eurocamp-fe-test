export const newUser = (name:string, email:string) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: 'POST',
          body: JSON.stringify({ name, email }),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
        .then(res => {
          res
            .json()
            .then(json => resolve(json))
            .catch(e => reject(e))
        })
        .catch(e => reject(e))
    })
}
export const DeleteUser = (id:string) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
          method: 'DELETE',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
        .then(res => {
          if(!res.ok){
            throw Error('delete user error')
          }
          return resolve(res);
        })
        .catch(e => reject(e))
    })
}
