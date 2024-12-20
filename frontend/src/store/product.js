import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success:false, message:"Please Fill All Fields"}
        }
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await response.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success:true, message:"Product Created Successfully"}
    },

    fetchProducts: async () => {
        const res =await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    },

    deleteProducts: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        })
        const data = await res.json();
        if(!data.success) return { success:false, message:data.message};

        //update the UI without needing to refresh
        set((state) => ({products: state.products.filter(product => product._id!== pid)}));
        return {success:true, message: data.message}
    },

    updateProduct: async (pid, updatedProduct) => {
        if(!updatedProduct._id ||!updatedProduct.name ||!updatedProduct.image ||!updatedProduct.price){
            return {success:false, message:"Please Fill All Fields"}
        }
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json();
        if(!data.success) return { success:false, message:data.message};

        //update the UI without needing to refresh
        set(state => ({
            products: state.products.map(product => product._id === pid? data.data : product)
        }))
        return {success:true, message: data.message}
    }
})) 