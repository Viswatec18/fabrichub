import { supabase } from '../lib/supabase';

// Get user's cart items
export const getCartItems = async (userId) => {
  try {
    const { data, error } = await supabase?.from('cart_items')?.select(`
        *,
        fabric:fabrics(
          id,
          name,
          price_per_yard,
          minimum_order_quantity,
          fabric_images(
            image_url
          ),
          vendor:vendors(
            id,
            name
          )
        )
      `)?.eq('user_id', userId)?.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (cartItem) => {
  try {
    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase?.from('cart_items')?.select('*')?.eq('user_id', cartItem?.user_id)?.eq('fabric_id', cartItem?.fabric_id)?.single();

    if (checkError && checkError?.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingItem) {
      // Update quantity if item exists
      const { data, error } = await supabase?.from('cart_items')?.update({ 
          quantity: existingItem?.quantity + cartItem?.quantity,
          updated_at: new Date()?.toISOString()
        })?.eq('id', existingItem?.id)?.select()?.single();

      if (error) {
        throw error;
      }

      return data;
    } else {
      // Add new item
      const { data, error } = await supabase?.from('cart_items')?.insert([cartItem])?.select()?.single();

      if (error) {
        throw error;
      }

      return data;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const { data, error } = await supabase?.from('cart_items')?.update({ 
        quantity,
        updated_at: new Date()?.toISOString()
      })?.eq('id', cartItemId)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
  try {
    const { error } = await supabase?.from('cart_items')?.delete()?.eq('id', cartItemId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async (userId) => {
  try {
    const { error } = await supabase?.from('cart_items')?.delete()?.eq('user_id', userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Get cart summary
export const getCartSummary = async (userId) => {
  try {
    const { data, error } = await supabase?.from('cart_items')?.select(`
        quantity,
        fabric:fabrics(price_per_yard)
      `)?.eq('user_id', userId);

    if (error) {
      throw error;
    }

    const summary = data?.reduce((acc, item) => {
      const itemTotal = item?.quantity * (item?.fabric?.price_per_yard || 0);
      acc.totalItems += item?.quantity || 0;
      acc.totalAmount += itemTotal;
      return acc;
    }, { totalItems: 0, totalAmount: 0 });

    return summary || { totalItems: 0, totalAmount: 0 };
  } catch (error) {
    console.error('Error getting cart summary:', error);
    throw error;
  }
};