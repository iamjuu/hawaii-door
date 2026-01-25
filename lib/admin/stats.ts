import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import Door from "@/models/Door";

export type DashboardStats = {
  gallery: {
    total: number;
  };
  doors: {
    total: number;
  };
};

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [galleryCount, doorsCount] = await Promise.all([
    Gallery.countDocuments(),
    Door.countDocuments(),
  ]);

  return {
    gallery: {
      total: galleryCount,
    },
    doors: {
      total: doorsCount,
    },
  };
}



