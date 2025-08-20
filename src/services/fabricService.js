import { supabase } from '../lib/supabase';

// Retry utility function
const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Don't retry on certain errors
      if (error?.message?.includes('does not exist') || 
          error?.message?.includes('PGRST116') ||
          error?.code === 'PGRST116') {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Check Supabase connection
const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase?.from('fabrics')?.select('id')?.limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};

// Get all fabrics with optional filtering and pagination
export const getFabrics = async (filters = {}) => {
  try {
    // Check connection first
    const isConnected = await checkSupabaseConnection();
    if (!isConnected) {
      throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
    }

    const operation = async () => {
      let query = supabase?.from('fabrics')?.select(`
        *,
        vendor:vendors(
          id,
          name,
          verified,
          rating
        ),
        fabric_images(
          id,
          image_url,
          display_order
        )
      `);

      // Apply filters
      if (filters?.materials && filters?.materials?.length > 0) {
        query = query?.in('material', filters?.materials);
      }

      if (filters?.vendors && filters?.vendors?.length > 0) {
        query = query?.in('vendor_id', filters?.vendors);
      }

      if (filters?.priceRange?.min) {
        query = query?.gte('price_per_yard', parseFloat(filters?.priceRange?.min));
      }

      if (filters?.priceRange?.max) {
        query = query?.lte('price_per_yard', parseFloat(filters?.priceRange?.max));
      }

      if (filters?.gsmRange?.min) {
        query = query?.gte('gsm', parseInt(filters?.gsmRange?.min));
      }

      if (filters?.gsmRange?.max) {
        query = query?.lte('gsm', parseInt(filters?.gsmRange?.max));
      }

      if (filters?.moqRange?.min) {
        query = query?.gte('minimum_order_quantity', parseInt(filters?.moqRange?.min));
      }

      if (filters?.moqRange?.max) {
        query = query?.lte('minimum_order_quantity', parseInt(filters?.moqRange?.max));
      }

      // Search functionality
      if (filters?.search) {
        query = query?.or(`name.ilike.%${filters?.search}%,material.ilike.%${filters?.search}%,composition.ilike.%${filters?.search}%`);
      }

      // Sorting
      if (filters?.sortBy) {
        switch (filters?.sortBy) {
          case 'price-low':
            query = query?.order('price_per_yard', { ascending: true });
            break;
          case 'price-high':
            query = query?.order('price_per_yard', { ascending: false });
            break;
          case 'newest':
            query = query?.order('created_at', { ascending: false });
            break;
          case 'rating':
            query = query?.order('rating', { ascending: false });
            break;
          case 'moq-low':
            query = query?.order('minimum_order_quantity', { ascending: true });
            break;
          case 'moq-high':
            query = query?.order('minimum_order_quantity', { ascending: false });
            break;
          default:
            query = query?.order('created_at', { ascending: false });
        }
      }

      // Pagination
      if (filters?.page && filters?.itemsPerPage) {
        const from = (filters?.page - 1) * filters?.itemsPerPage;
        const to = from + filters?.itemsPerPage - 1;
        query = query?.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        // Handle specific network errors with helpful messages
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('NetworkError') ||
            error?.message?.includes('fetch')) {
          throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        }
        
        // Handle authentication errors
        if (error?.message?.includes('AuthRetryableFetchError') ||
            error?.message?.includes('JWT')) {
          throw new Error('Authentication service is unavailable. Please check your Supabase project status and ensure it is active.');
        }
        
        // Handle other database errors
        if (error?.code === 'PGRST116' || error?.message?.includes('PGRST116')) {
          throw new Error('Database table "fabrics" not found. Please ensure your migration has been applied correctly.');
        }
        
        if (error?.message?.includes('relation') && error?.message?.includes('does not exist')) {
          throw new Error('Database schema is not properly set up. Please check if your Supabase migration has been applied.');
        }
        
        // Handle permission errors
        if (error?.message?.includes('permission') || error?.message?.includes('RLS')) {
          throw new Error('Database access denied. Please check your Row Level Security policies or contact support.');
        }
        
        // Generic error for unknown issues
        console.error('Database error details:', error);
        throw new Error(`Database error: ${error?.message || 'Failed to load fabrics. Please try again.'}`);
      }

      return { data: data || [], count: count || 0 };
    };

    return await retryOperation(operation);
  } catch (error) {
    console.error('Error fetching fabrics:', error);
    throw error;
  }
};

// Get fabric by ID
export const getFabricById = async (id) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.select(`
        *,
        vendor:vendors(
          id,
          name,
          verified,
          rating,
          contact_email,
          contact_phone,
          address
        ),
        fabric_images(
          id,
          image_url,
          display_order
        ),
        fabric_reviews(
          id,
          rating,
          review_text,
          created_at,
          user:user_profiles(
            id,
            full_name
          )
        )
      `)?.eq('id', id)?.single();

    if (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
      }
      throw new Error('Failed to load fabric details. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching fabric by ID:', error);
    throw error;
  }
};

// Create new fabric (vendor only)
export const createFabric = async (fabricData) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.insert([fabricData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating fabric:', error);
    throw error;
  }
};

// Update fabric (vendor only)
export const updateFabric = async (id, updates) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.update(updates)?.eq('id', id)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating fabric:', error);
    throw error;
  }
};

// Delete fabric (vendor only)
export const deleteFabric = async (id) => {
  try {
    const { error } = await supabase?.from('fabrics')?.delete()?.eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting fabric:', error);
    throw error;
  }
};

// Upload fabric image
export const uploadFabricImage = async (fabricId, file, displayOrder = 1) => {
  try {
    const fileName = `${fabricId}/${Date.now()}-${file?.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase?.storage?.from('fabric-images')?.upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase?.storage?.from('fabric-images')?.getPublicUrl(fileName);

    const { data, error } = await supabase?.from('fabric_images')?.insert([{
        fabric_id: fabricId,
        image_url: urlData?.publicUrl,
        display_order: displayOrder
      }])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error uploading fabric image:', error);
    throw error;
  }
};

// Get fabric materials for filters
export const getFabricMaterials = async () => {
  try {
    const operation = async () => {
      const { data, error } = await supabase?.from('fabrics')?.select('material')?.not('material', 'is', null);

      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('NetworkError') ||
            error?.message?.includes('fetch')) {
          throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        }
        
        if (error?.code === 'PGRST116' || error?.message?.includes('does not exist')) {
          return []; // Return empty array for materials if table doesn't exist
        }
        
        console.error('Error fetching materials:', error);
        return []; // Return empty array for materials if there's an error
      }

      const materials = [...new Set(data?.map(item => item?.material))]?.filter(Boolean);
      return materials;
    };

    return await retryOperation(operation);
  } catch (error) {
    console.error('Error fetching fabric materials:', error);
    return []; // Always return empty array on error for materials
  }
};

// Add fabric review
export const addFabricReview = async (fabricId, reviewData) => {
  try {
    const { data, error } = await supabase?.from('fabric_reviews')?.insert([{
        ...reviewData,
        fabric_id: fabricId
      }])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding fabric review:', error);
    throw error;
  }
};
function getVendors(...args) {
  // eslint-disable-next-line no-console
  console.warn('Placeholder: getVendors is not implemented yet.', args);
  return null;
}

export { getVendors };