import { User } from './auth';

export type ComplaintStatus = 'pending' | 'assigned' | 'in-progress' | 'resolved' | 'rejected';

export type ComplaintCategory = 'roads' | 'water' | 'electricity' | 'sanitation' | 'other';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  assignedTo?: string;
  resolutionNotes?: string;
  resolutionImages?: string[];
  rating?: number;
}

// Generate random date within the last 30 days
const randomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date;
};

// Mock complaint data
export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'There is a large pothole on Main Street near the intersection with Oak Avenue that is causing damage to vehicles.',
    location: '123 Main Street',
    category: 'roads',
    status: 'resolved',
    imageUrl: 'https://images.pexels.com/photos/247795/pexels-photo-247795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: randomDate(),
    updatedAt: new Date(),
    userId: '1',
    assignedTo: '2',
    resolutionNotes: 'Pothole has been filled and road surface repaired.',
    resolutionImages: ['https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4,
  },
  {
    id: '2',
    title: 'Street Light Not Working',
    description: 'The street light on Elm Street has been out for over a week, making the area very dark and unsafe at night.',
    location: '456 Elm Street',
    category: 'electricity',
    status: 'in-progress',
    imageUrl: 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: randomDate(),
    updatedAt: new Date(),
    userId: '1',
    assignedTo: '2',
  },
  {
    id: '3',
    title: 'Water Main Break',
    description: 'Water is flooding the street due to what appears to be a broken water main. The water has been flowing for several hours.',
    location: '789 Pine Avenue',
    category: 'water',
    status: 'assigned',
    imageUrl: 'https://images.pexels.com/photos/2253915/pexels-photo-2253915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: randomDate(),
    updatedAt: new Date(),
    userId: '1',
    assignedTo: '2',
  },
  {
    id: '4',
    title: 'Overflowing Trash Bins',
    description: 'The public trash bins in Central Park haven\'t been emptied in weeks and are overflowing, causing a sanitation issue.',
    location: 'Central Park, Near West Entrance',
    category: 'sanitation',
    status: 'pending',
    imageUrl: 'https://images.pexels.com/photos/3935236/pexels-photo-3935236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: randomDate(),
    updatedAt: new Date(),
    userId: '1',
  },
  {
    id: '5',
    title: 'Damaged Park Bench',
    description: 'One of the benches in City Park has broken slats that could cause injury to someone sitting on it.',
    location: 'City Park, Near Fountain',
    category: 'other',
    status: 'rejected',
    imageUrl: 'https://images.pexels.com/photos/1201673/pexels-photo-1201673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: randomDate(),
    updatedAt: new Date(),
    userId: '1',
    resolutionNotes: 'This bench is scheduled for replacement in the next fiscal year as part of park renovations.',
  },
];

// Get all complaints
export const getAllComplaints = (): Promise<Complaint[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      resolve([...MOCK_COMPLAINTS]);
    }, 1000);
  });
};

// Get complaints for a specific user
export const getUserComplaints = (userId: string): Promise<Complaint[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const userComplaints = MOCK_COMPLAINTS.filter(complaint => complaint.userId === userId);
      resolve([...userComplaints]);
    }, 1000);
  });
};

// Get complaints assigned to a specific agent
export const getAgentComplaints = (agentId: string): Promise<Complaint[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const agentComplaints = MOCK_COMPLAINTS.filter(complaint => complaint.assignedTo === agentId);
      resolve([...agentComplaints]);
    }, 1000);
  });
};

// Create a new complaint
export const createComplaint = (
  complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: ComplaintStatus }
): Promise<Complaint> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const newComplaint: Complaint = {
        id: String(MOCK_COMPLAINTS.length + 1),
        ...complaintData,
        status: complaintData.status || 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // In a real app, this would be added to the database
      MOCK_COMPLAINTS.push(newComplaint);
      
      resolve(newComplaint);
    }, 1000);
  });
};

// Update an existing complaint
export const updateComplaint = (
  complaintId: string,
  updates: Partial<Complaint>
): Promise<Complaint> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const index = MOCK_COMPLAINTS.findIndex(c => c.id === complaintId);
      
      if (index === -1) {
        reject(new Error('Complaint not found'));
        return;
      }
      
      // Update the complaint
      MOCK_COMPLAINTS[index] = {
        ...MOCK_COMPLAINTS[index],
        ...updates,
        updatedAt: new Date(),
      };
      
      resolve(MOCK_COMPLAINTS[index]);
    }, 1000);
  });
};

// Get complaint statistics for admin dashboard
export const getComplaintStatistics = (): Promise<{
  total: number;
  pending: number;
  assigned: number;
  inProgress: number;
  resolved: number;
  rejected: number;
  byCategory: Record<ComplaintCategory, number>;
}> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const stats = {
        total: MOCK_COMPLAINTS.length,
        pending: MOCK_COMPLAINTS.filter(c => c.status === 'pending').length,
        assigned: MOCK_COMPLAINTS.filter(c => c.status === 'assigned').length,
        inProgress: MOCK_COMPLAINTS.filter(c => c.status === 'in-progress').length,
        resolved: MOCK_COMPLAINTS.filter(c => c.status === 'resolved').length,
        rejected: MOCK_COMPLAINTS.filter(c => c.status === 'rejected').length,
        byCategory: {
          roads: MOCK_COMPLAINTS.filter(c => c.category === 'roads').length,
          water: MOCK_COMPLAINTS.filter(c => c.category === 'water').length,
          electricity: MOCK_COMPLAINTS.filter(c => c.category === 'electricity').length,
          sanitation: MOCK_COMPLAINTS.filter(c => c.category === 'sanitation').length,
          other: MOCK_COMPLAINTS.filter(c => c.category === 'other').length,
        } as Record<ComplaintCategory, number>,
      };
      
      resolve(stats);
    }, 1000);
  });
};

// Get monthly complaint trends for admin dashboard
export const getMonthlyComplaintTrends = (): Promise<{
  month: string;
  complaints: number;
}[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      // Generate mock monthly data for the last 6 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const data = months.map(month => ({
        month,
        complaints: Math.floor(Math.random() * 30) + 10, // Random number between 10 and 40
      }));
      
      resolve(data);
    }, 1000);
  });
};