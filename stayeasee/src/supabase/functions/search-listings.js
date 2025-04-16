// supabase/functions/search-listings.js
export default async (req, context) => {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        daily_price,
        location,
        amenities,
        profiles(full_name, avatar_url)
      `)
      .gte('daily_price', req.query.minPrice)
      .lte('daily_price', req.query.maxPrice)
      .contains('amenities', req.query.amenities);
  
    return new Response(JSON.stringify(data));
  };