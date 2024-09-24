import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    //verificamos si existe o no existe el archivo, si no existe es un array vacio
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("instance created");
    } else {
      console.log("instance alredy exists");
    }
  }

  //metodo que lea el archivo
  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      console.log(parseData);
      if (category) {
        const filteredData = parseData.filter(
          (each) => each.category === category
        );
        return filteredData;
      } else {
        return parseData;
      }
      // return parseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo que lea por id
  async readId(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      console.log(one);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo crear
  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAll();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //metodo actuaizar
  async update(id, newData) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((each) => each.id === id);
      if (index === -1) {
        // Producto no encontrado
        return null; 
      }
      // Actualizar los datos del producto
      // Mezcla de los datos existentes y nuevos
      all[index] = { ...all[index], ...newData }; 
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      // Devuelve el producto actualizado
      return all[index]; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

 //metodo borrar
  async delete(id) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((each) => each.id === id);
      if (index === -1) {
        // Producto no encontrado
        return null; 
      }
      // Eliminar el producto
      // Remueve el producto del array
      all.splice(index, 1); 
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      // Mensaje de confirmación
      return { message: `Product ${id} deleted`}; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
}

const productsManager = new ProductsManager("./src/data/fs/products.json");
//manager.read()
export default productsManager;