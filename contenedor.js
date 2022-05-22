const fs = require('fs')

class Contenedor{

  constructor(filename){
    this.filename = filename;
  }

  async write(items){
    try{
      if(items instanceof Array){
        await fs.promises.writeFile(this.filename,JSON.stringify(items))
        return
      }
    }
    catch(err){
      console.log(`error try saved ${this.filename} - description error :  ${error}`)
    }
  }
  
  async read(){
    try{
      const data = await fs.promises.readFile(this.filename, 'utf-8');
      return   data  ? JSON.parse(data) : [];
    }
    catch(err){
      if(err.code === 'ENOENT'){
        return [];
      }else{
        console.log(`error trying read file ${this.filename}`)
      }
    }
  }

  getMaxId(items){
    const length = items.length;

    if(length < 1) return 1

    return items[length-1].id + 1;
  }

  async getAll(){
    return await this.read();
  }

  async deleteById(id) {
    const items = await this.read();
    const idx = items.findIndex(p => p.id == id) 
    items.splice(idx , 1)

    await this.write(items)
  }

  async deleteAll() {
    await this.write([])
  }  

  async getById(id){
    const items = await this.read();
    return items.find(p => p.id == id)
  }

  async save(item){
      const items = await this.read();
      let id = this.getMaxId(items);
      items.push({id, ...item});
      await this.write(items);
  }

}

module.exports = Contenedor;