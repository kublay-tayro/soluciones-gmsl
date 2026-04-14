import supabase from '@/supabaseClient';

// Obtener todos los productos
export const getProducts = async () => {
    try {
        console.log('Fetching products from Supabase...');
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log('Products loaded:', data);
        return data || [];
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        return null;
    }
};

// Crear un nuevo producto
export const createProduct = async (product) => {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    return data;
};

// Actualizar un producto existente
export const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }

    return data;
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }

    return true;
};
