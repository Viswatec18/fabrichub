import { supabase } from '../lib/supabase';

// Get all designers
export const getDesigners = async (filters = {}) => {
  try {
    let query = supabase?.from('designers')?.select(`
        *,
        designer_portfolios(
          id,
          image_url,
          title
        )
      `);

    // Apply filters
    if (filters?.specialties && filters?.specialties?.length > 0) {
      query = query?.overlaps('specialties', filters?.specialties);
    }

    if (filters?.location) {
      query = query?.ilike('location', `%${filters?.location}%`);
    }

    if (filters?.experienceLevel) {
      query = query?.eq('experience_level', filters?.experienceLevel);
    }

    if (filters?.search) {
      query = query?.or(`name.ilike.%${filters?.search}%,bio.ilike.%${filters?.search}%`);
    }

    // Sorting
    if (filters?.sortBy) {
      switch (filters?.sortBy) {
        case 'name':
          query = query?.order('name', { ascending: true });
          break;
        case 'rating':
          query = query?.order('rating', { ascending: false });
          break;
        case 'experience':
          query = query?.order('years_experience', { ascending: false });
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
      throw error;
    }

    return { data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching designers:', error);
    throw error;
  }
};

// Get designer by ID
export const getDesignerById = async (designerId) => {
  try {
    const { data, error } = await supabase?.from('designers')?.select(`
        *,
        designer_portfolios(
          id,
          image_url,
          title,
          description,
          project_date
        ),
        designer_reviews(
          id,
          rating,
          review_text,
          created_at,
          client_name
        )
      `)?.eq('id', designerId)?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching designer by ID:', error);
    throw error;
  }
};

// Create designer profile
export const createDesignerProfile = async (designerData) => {
  try {
    const { data, error } = await supabase?.from('designers')?.insert([designerData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating designer profile:', error);
    throw error;
  }
};

// Update designer profile
export const updateDesignerProfile = async (designerId, updates) => {
  try {
    const { data, error } = await supabase?.from('designers')?.update({
        ...updates,
        updated_at: new Date()?.toISOString()
      })?.eq('id', designerId)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating designer profile:', error);
    throw error;
  }
};

// Add portfolio item
export const addPortfolioItem = async (portfolioData) => {
  try {
    const { data, error } = await supabase?.from('designer_portfolios')?.insert([portfolioData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    throw error;
  }
};

// Upload portfolio image
export const uploadPortfolioImage = async (designerId, file) => {
  try {
    const fileName = `${designerId}/${Date.now()}-${file?.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase?.storage?.from('portfolio-images')?.upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase?.storage?.from('portfolio-images')?.getPublicUrl(fileName);

    return urlData?.publicUrl;
  } catch (error) {
    console.error('Error uploading portfolio image:', error);
    throw error;
  }
};

// Add designer review
export const addDesignerReview = async (reviewData) => {
  try {
    const { data, error } = await supabase?.from('designer_reviews')?.insert([reviewData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding designer review:', error);
    throw error;
  }
};

// Get designer specialties for filters
export const getDesignerSpecialties = async () => {
  try {
    const { data, error } = await supabase?.from('designers')?.select('specialties')?.not('specialties', 'is', null);

    if (error) {
      throw error;
    }

    const specialties = new Set();
    data?.forEach(designer => {
      designer?.specialties?.forEach(specialty => {
        specialties?.add(specialty);
      });
    });

    return Array.from(specialties);
  } catch (error) {
    console.error('Error fetching designer specialties:', error);
    throw error;
  }
};

// Send contact message to designer
export const sendContactMessage = async (messageData) => {
  try {
    const { data, error } = await supabase?.from('designer_contacts')?.insert([messageData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};