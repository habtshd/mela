import {
  User,
  Child,
  Therapist,
  Program,
  Appointment,
  SessionRecord,
  Invoice,
  ActivityLog,
  NotificationItem,
  OrganizationSettings
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: 'user-admin',
    name: 'Wanos Mesfin (ዋኖስ መስፍን)',
    email: 'wanos.mesfin@melaspecialneeds.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    title: 'Founder & Clinical Director, Special Needs Specialist'
  },
  therapist: {
    id: 'user-therapist',
    name: 'Wanos Mesfin',
    email: 'wanos.mesfin@melaspecialneeds.org',
    role: 'therapist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    title: 'Lead Special Needs & Inclusive Education Specialist',
    therapistId: 'therapist-1'
  },
  parent: {
    id: 'user-parent',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    title: 'Guardian of Liam Jenkins',
    assignedChildId: 'child-1'
  }
};

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: 'therapist-1',
    name: 'Wanos Mesfin (ዋኖስ መስፍን)',
    title: 'Founder & Lead Special Needs Specialist',
    credentials: 'MA, Special Needs & Inclusive Education',
    email: 'wanos@melaspecialneeds.org',
    phone: '+251 717 484 604',
    bio: 'Renowned Ethiopian author, trainer, and child development specialist focusing on autism, ABA, and inclusive schooling.',
    specializations: ['Autism Spectrum Support', 'Applied Behavior Analysis (ABA)', 'Inclusive School Strategy', 'Caregiver Coaching'],
    activeCaseloadCount: 16,
    weeklyHours: 40,
    availability: ['Mon: 8am-5pm', 'Tue: 8am-5pm', 'Wed: 8am-5pm', 'Thu: 8am-5pm', 'Fri: 8am-5pm', 'Sat: 8:30am-1pm'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2018,
    roomPreference: 'Clinical Evaluation Suite 1'
  },
  {
    id: 'therapist-2',
    name: 'Eden Tesfaye',
    title: 'Lead Speech & Language Pathologist',
    credentials: 'M.Sc., Speech & Language Therapy',
    email: 'eden.t@melaspecialneeds.org',
    phone: '+251 919 484 604',
    bio: 'Specializes in pediatric communication delays, speech articulation, and alternative augmentative communication (AAC).',
    specializations: ['Augmentative & Alternative Comm (AAC)', 'Expressive Language Delays', 'Speech Articulation', 'Social Pragmatics'],
    activeCaseloadCount: 18,
    weeklyHours: 38,
    availability: ['Mon: 8:30am-4:30pm', 'Tue: 8:30am-4:30pm', 'Wed: 8:30am-4:30pm', 'Thu: 8:30am-4:30pm'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2020,
    roomPreference: 'Speech & Language Pod A'
  },
  {
    id: 'therapist-3',
    name: 'Dawit Haile',
    title: 'Senior Occupational & Sensory Therapist',
    credentials: 'B.Sc., Occupational Therapy, Sensory Certified',
    email: 'dawit.h@melaspecialneeds.org',
    phone: '+251 717 484 604',
    bio: 'Expert in sensory modulation, fine-motor rehabilitation, self-care routines, and vestibular integration in sensory gym environments.',
    specializations: ['Sensory Integration Therapy', 'Fine Motor Development', 'Self-Care Independence', 'Bilateral Coordination'],
    activeCaseloadCount: 15,
    weeklyHours: 36,
    availability: ['Mon: 9am-5pm', 'Tue: 9am-5pm', 'Wed: 9am-5pm', 'Thu: 9am-5pm', 'Fri: 9am-2pm'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2019,
    roomPreference: 'Main Sensory Gym'
  },
  {
    id: 'therapist-4',
    name: 'Bethelhem Girma',
    title: 'Applied Behavior & Autism Support Specialist',
    credentials: 'B.A. Psychology, Certified Behavior Technician',
    email: 'bethelhem.g@melaspecialneeds.org',
    phone: '+251 952 118 642',
    bio: 'Focuses on positive behavioral guidance, emotional regulation, and classroom transition strategies for neurodivergent children.',
    specializations: ['Behavioral Modification', 'Emotional Co-regulation', 'Structured Routines', 'School Readiness'],
    activeCaseloadCount: 13,
    weeklyHours: 35,
    availability: ['Tue: 8am-4pm', 'Wed: 8am-4pm', 'Thu: 8am-4pm', 'Fri: 8am-4pm', 'Sat: 9am-2pm'],
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2021,
    roomPreference: 'Behavioral & Play Suite'
  },
  {
    id: 'therapist-5',
    name: 'Yohannes Bekele',
    title: 'Shadow Teacher Supervisor & School Inclusion Lead',
    credentials: 'B.Ed. Special Needs Education, CPD Certified',
    email: 'yohannes.b@melaspecialneeds.org',
    phone: '+251 707 573 253',
    bio: 'Coordinates and supervises trained shadow teachers placed across private and international schools in Addis Ababa.',
    specializations: ['Shadow Teacher Training', 'School Classroom Adaptation', 'IEP Implementation', 'Teacher Coaching'],
    activeCaseloadCount: 20,
    weeklyHours: 40,
    availability: ['Mon: 8am-4pm', 'Tue: 8am-4pm', 'Wed: 8am-4pm', 'Thu: 8am-4pm', 'Fri: 8am-4pm'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2021,
    roomPreference: 'Inclusion & Training Center'
  },
  {
    id: 'therapist-6',
    name: 'Selamawit Tadesse',
    title: 'Early Intervention & Sign Language Specialist',
    credentials: 'B.Sc. Child Development, EthSL Certified',
    email: 'selamawit.t@melaspecialneeds.org',
    phone: '+251 952 118 642',
    bio: 'Dedicated to developmental stimulation for toddlers (18m–5y) and Ethiopian Sign Language communication training for families.',
    specializations: ['Early Intervention', 'Ethiopian Sign Language (EthSL)', 'Sensory Play Stimulation', 'Parent Coaching'],
    activeCaseloadCount: 12,
    weeklyHours: 30,
    availability: ['Mon: 9am-3pm', 'Wed: 9am-3pm', 'Fri: 9am-3pm', 'Sat: 9am-1pm'],
    avatar: 'https://images.unsplash.com/photo-1594824813587-0b1a03004d16?auto=format&fit=crop&q=80&w=300',
    joinedYear: 2022,
    roomPreference: 'Early Years Playroom'
  }
];

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'child-1',
    firstName: 'Liam',
    lastName: 'Jenkins',
    dateOfBirth: '2019-04-12',
    age: 6,
    gender: 'Male',
    primaryDiagnosis: 'Autism Spectrum (Level 1-2 Support)',
    secondaryDiagnosis: 'Sensory Processing Sensitivity',
    enrollmentDate: '2023-09-15',
    status: 'active',
    guardian: {
      id: 'guard-1',
      name: 'Sarah Jenkins',
      relationship: 'Mother',
      phone: '(555) 492-7104',
      email: 'sarah.jenkins@example.com',
      address: '1428 Maple Ridge Way, Suite 4B',
      preferredContactMethod: 'sms'
    },
    assignedTherapistId: 'therapist-1',
    assignedTherapistName: 'Michael Chen',
    programIds: ['prog-1', 'prog-4'],
    emergencyContact: 'Mark Jenkins (Father) - (555) 492-7105',
    allergiesSensoryNotes: 'Averse to sudden loud fluorescent hums; responds well to weighted vests and deep pressure swings.',
    avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
    notes: 'Liam has shown remarkable breakthrough in sensory regulation during table-top fine motor tasks.',
    goals: [
      {
        id: 'goal-101',
        title: 'Bilateral Coordination & Scissor Cutting',
        category: 'Motor Skills',
        targetDate: '2026-11-30',
        baseline: 'Unable to hold paper with non-dominant hand while cutting straight lines.',
        currentProgress: 85,
        status: 'in_progress',
        notes: 'Currently cuts curved lines with 80% accuracy using adaptive loop scissors.'
      },
      {
        id: 'goal-102',
        title: 'Expressive 3-to-4 Word Sentence Formulation',
        category: 'Speech',
        targetDate: '2026-12-15',
        baseline: 'Single word vocalizations or non-verbal gesturing.',
        currentProgress: 75,
        status: 'in_progress',
        notes: 'Frequently uses "I want more blue swing" unprompted during gym transitions.'
      },
      {
        id: 'goal-103',
        title: 'Sensory Self-Advocacy & Ear Defender Usage',
        category: 'Sensory',
        targetDate: '2026-10-31',
        baseline: 'Covering ears and crying when entering noisy common areas.',
        currentProgress: 95,
        status: 'mastered',
        notes: 'Independently retrieves noise-dampening headphones from his cubby before entering the hallway.'
      }
    ]
  },
  {
    id: 'child-2',
    firstName: 'Maya',
    lastName: 'Patel',
    dateOfBirth: '2020-08-20',
    age: 5,
    gender: 'Female',
    primaryDiagnosis: 'Developmental Speech Delay',
    secondaryDiagnosis: 'Oral Motor Weakness',
    enrollmentDate: '2024-01-10',
    status: 'active',
    guardian: {
      id: 'guard-2',
      name: 'Priya & Rajiv Patel',
      relationship: 'Parents',
      phone: '(555) 601-3829',
      email: 'priya.patel@example.com',
      address: '782 Cedar Crest Blvd',
      preferredContactMethod: 'email'
    },
    assignedTherapistId: 'therapist-2',
    assignedTherapistName: 'Amara Okafor',
    programIds: ['prog-2', 'prog-5'],
    emergencyContact: 'Rajiv Patel - (555) 601-3830',
    allergiesSensoryNotes: 'No known allergies. Sensitive to sticky textures on fingers.',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-201',
        title: 'Phonemic Articulation of /m/, /b/, /p/ Sounds',
        category: 'Speech',
        targetDate: '2026-11-15',
        baseline: 'Substitutes /t/ and /d/ sounds in 90% of trials.',
        currentProgress: 70,
        status: 'in_progress',
        notes: 'Bubble play blowing exercises have significantly strengthened lip closure.'
      },
      {
        id: 'goal-202',
        title: 'Turn-Taking in 3-Person Board Play',
        category: 'Social',
        targetDate: '2026-12-01',
        baseline: 'High impatience; grabs pieces out of peer turn.',
        currentProgress: 60,
        status: 'in_progress',
        notes: 'Visual timer board helps Maya anticipate her turn comfortably.'
      }
    ]
  },
  {
    id: 'child-3',
    firstName: 'Noah',
    lastName: 'Kaufman',
    dateOfBirth: '2018-11-05',
    age: 7,
    gender: 'Male',
    primaryDiagnosis: 'ADHD (Combined Presentation)',
    secondaryDiagnosis: 'Executive Function Delay',
    enrollmentDate: '2023-04-20',
    status: 'active',
    guardian: {
      id: 'guard-3',
      name: 'Jessica Kaufman',
      relationship: 'Mother',
      phone: '(555) 789-1122',
      email: 'jess.kaufman@example.com',
      address: '310 Willow Bend Drive',
      preferredContactMethod: 'phone'
    },
    assignedTherapistId: 'therapist-3',
    assignedTherapistName: 'David Alvarez',
    programIds: ['prog-3', 'prog-1'],
    emergencyContact: 'Grandmother Alice - (555) 789-1125',
    allergiesSensoryNotes: 'Peanut allergy (EpiPen kept at front clinical reception). Needs movement breaks every 15 minutes.',
    avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-301',
        title: 'Independent 3-Step Task Sequencing',
        category: 'Life Skills',
        targetDate: '2026-11-20',
        baseline: 'Requires verbal redirection after step 1.',
        currentProgress: 80,
        status: 'in_progress',
        notes: 'Visual token cards enabled Noah to complete backpack packing checklist.'
      }
    ]
  },
  {
    id: 'child-4',
    firstName: 'Zoe',
    lastName: 'Gomez',
    dateOfBirth: '2019-02-14',
    age: 7,
    gender: 'Female',
    primaryDiagnosis: 'Cerebral Palsy (Spastic Diplegia)',
    enrollmentDate: '2023-08-01',
    status: 'active',
    guardian: {
      id: 'guard-4',
      name: 'Carlos Gomez',
      relationship: 'Father',
      phone: '(555) 882-9901',
      email: 'carlos.gomez@example.com',
      address: '915 Sunset Heights Rd',
      preferredContactMethod: 'phone'
    },
    assignedTherapistId: 'therapist-4',
    assignedTherapistName: 'Elena Rostova',
    programIds: ['prog-6', 'prog-1'],
    emergencyContact: 'Tia Rosa - (555) 882-9905',
    allergiesSensoryNotes: 'Uses custom ankle-foot orthoses (AFOs). Loves aquatic sensory warm towels.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-401',
        title: 'Independent Quad Cane Ambulation 50 Meters',
        category: 'Motor Skills',
        targetDate: '2026-12-20',
        baseline: 'Max assistance required for distance over 15 meters.',
        currentProgress: 65,
        status: 'in_progress',
        notes: 'Gait symmetry improved significantly on tread harness.'
      }
    ]
  },
  {
    id: 'child-5',
    firstName: 'Ethan',
    lastName: 'Taylor',
    dateOfBirth: '2021-06-30',
    age: 4,
    gender: 'Male',
    primaryDiagnosis: 'Down Syndrome',
    secondaryDiagnosis: 'Hypotonia & Gross Motor Delay',
    enrollmentDate: '2024-03-01',
    status: 'active',
    guardian: {
      id: 'guard-5',
      name: 'Amanda Taylor',
      relationship: 'Mother',
      phone: '(555) 431-8890',
      email: 'amanda.t@example.com',
      address: '44 Meadowbrook Court',
      preferredContactMethod: 'sms'
    },
    assignedTherapistId: 'therapist-1',
    assignedTherapistName: 'Michael Chen',
    programIds: ['prog-1', 'prog-2'],
    emergencyContact: 'David Taylor - (555) 431-8891',
    allergiesSensoryNotes: 'Prone to ear sensitivity in cold weather. Loves vibrotactile musical toys.',
    avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-501',
        title: 'Core Stability & Independent Bench Seating for 10 Min',
        category: 'Motor Skills',
        targetDate: '2026-11-10',
        baseline: 'Postural fatigue and slumping within 2 minutes.',
        currentProgress: 90,
        status: 'in_progress',
        notes: 'Peanut ball therapy has dramatically strengthened thoracic extensors.'
      }
    ]
  },
  {
    id: 'child-6',
    firstName: 'Aria',
    lastName: 'Mercer',
    dateOfBirth: '2019-10-18',
    age: 6,
    gender: 'Female',
    primaryDiagnosis: 'Sensory Processing Disorder (Tactile Defensive)',
    enrollmentDate: '2023-11-12',
    status: 'active',
    guardian: {
      id: 'guard-6',
      name: 'Rachel Mercer',
      relationship: 'Mother',
      phone: '(555) 914-5544',
      email: 'rachel.mercer@example.com',
      address: '502 Pinehurst Ave',
      preferredContactMethod: 'email'
    },
    assignedTherapistId: 'therapist-6',
    assignedTherapistName: 'Marcus Bell',
    programIds: ['prog-4', 'prog-5'],
    emergencyContact: 'Rachel Mercer - (555) 914-5544',
    allergiesSensoryNotes: 'Severe tactile defensiveness to wet textures (glue, clay, mud).',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-601',
        title: 'Tolerating Textured Finger-Painting with Sponge Brush',
        category: 'Sensory',
        targetDate: '2026-11-25',
        baseline: 'Refusal and distress upon seeing finger-paint containers.',
        currentProgress: 75,
        status: 'in_progress',
        notes: 'Successfully participated in 8-minute sensory sand tray play.'
      }
    ]
  },
  {
    id: 'child-7',
    firstName: 'Lucas',
    lastName: 'Vargas',
    dateOfBirth: '2017-05-19',
    age: 8,
    gender: 'Male',
    primaryDiagnosis: 'Autism Spectrum (Level 1)',
    enrollmentDate: '2022-09-01',
    status: 'graduated',
    guardian: {
      id: 'guard-7',
      name: 'Elena Vargas',
      relationship: 'Mother',
      phone: '(555) 321-4455',
      email: 'elena.vargas@example.com',
      address: '1100 Oak Knoll',
      preferredContactMethod: 'email'
    },
    assignedTherapistId: 'therapist-5',
    assignedTherapistName: 'Sofia Martinez',
    programIds: ['prog-5'],
    emergencyContact: 'Elena Vargas - (555) 321-4455',
    allergiesSensoryNotes: 'No allergies. Successfully transitioned to mainstream general education classroom!',
    avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-701',
        title: 'Mastery of Cooperative Peer Conflict Resolution',
        category: 'Social',
        targetDate: '2025-06-01',
        baseline: 'Frequent shutdowns during group sports.',
        currentProgress: 100,
        status: 'mastered',
        notes: 'Graduated from social skills program with honors.'
      }
    ]
  },
  {
    id: 'child-8',
    firstName: 'Chloe',
    lastName: 'Bennett',
    dateOfBirth: '2021-12-02',
    age: 4,
    gender: 'Female',
    primaryDiagnosis: 'Expressive Language Delay & Apraxia of Speech',
    enrollmentDate: '2024-05-10',
    status: 'in_review',
    guardian: {
      id: 'guard-8',
      name: 'Thomas Bennett',
      relationship: 'Father',
      phone: '(555) 678-9900',
      email: 't.bennett@example.com',
      address: '67 Aspen Court',
      preferredContactMethod: 'phone'
    },
    assignedTherapistId: 'therapist-2',
    assignedTherapistName: 'Amara Okafor',
    programIds: ['prog-2'],
    emergencyContact: 'Thomas Bennett - (555) 678-9900',
    allergiesSensoryNotes: 'Sensitive to loud whistles and metallic sounds.',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
    goals: [
      {
        id: 'goal-801',
        title: 'Motor Speech Planning for Bilabial Words',
        category: 'Speech',
        targetDate: '2026-12-30',
        baseline: 'Understands complex directions but struggles with articulatory precision.',
        currentProgress: 45,
        status: 'in_progress',
        notes: 'PROMPT technique sessions showing promising motor sequencing.'
      }
    ]
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Pediatric Occupational & Sensory Integration Therapy',
    category: 'Occupational Therapy',
    description: 'Fine motor coordination, sensory processing, handwriting, and daily self-care independence.',
    detailedOverview: 'Sensory-rich clinical and home-based intervention supporting sensory modulation, fine motor precision, and autonomous daily living.',
    durationMinutes: 45,
    ageRange: 'Ages 2 – 14',
    leadTherapistId: 'therapist-3',
    leadTherapistName: 'Dawit Haile, B.Sc., OTR',
    maxCapacity: 25,
    enrolledCount: 22,
    iconName: 'Activity',
    scheduleDescription: 'Monday through Friday, morning and afternoon slots',
    objectives: [
      'Refine bilateral coordination and fine-motor handwriting grasp',
      'Address tactile and vestibular sensory defensiveness',
      'Foster autonomous self-care (dressing, feeding, hygiene)',
      'Design tailored home and school sensory diets for caregivers'
    ],
    benefits: [
      'Noticeable improvement in classroom stamina and writing endurance',
      'Reduced sensory overstimulation through proactive regulation routines',
      'Greater independence in daily home routines'
    ]
  },
  {
    id: 'prog-2',
    title: 'Speech, Language & AAC Therapy',
    category: 'Speech Therapy',
    description: 'Functional communication, verbal articulation, receptive language, and alternative augmentative communication.',
    detailedOverview: 'Child-centered speech therapy designed for delayed speech development, apraxia, social pragmatics, and AAC device integration in Amharic and English.',
    durationMinutes: 45,
    ageRange: 'Ages 18 mos – 16',
    leadTherapistId: 'therapist-2',
    leadTherapistName: 'Eden Tesfaye, M.Sc., SLP',
    maxCapacity: 24,
    enrolledCount: 21,
    iconName: 'MessageSquare',
    scheduleDescription: 'Monday to Thursday, customized 1-on-1 sessions',
    objectives: [
      'Expand functional verbal and multi-word sentence production',
      'Refine phonetic articulation and oral-motor coordination',
      'Train families and schools on high/low-tech AAC picture systems',
      'Enhance conversational turn-taking and peer communication'
    ],
    benefits: [
      'Reduced communication frustration and emotional outbursts',
      'Accessible communication bridges for non-verbal children',
      'Actionable parent coaching techniques for language stimulation at home'
    ]
  },
  {
    id: 'prog-3',
    title: 'Autism & Applied Behavior Analysis (ABA)',
    category: 'Behavioral Health',
    description: 'Positive behavioral support, emotional regulation, functional communication, and autism development.',
    detailedOverview: 'Evidence-based behavioral intervention led by Wanos Mesfin, replacing challenging behaviors with communication and building school transition readiness.',
    durationMinutes: 60,
    ageRange: 'Ages 2 – 14',
    leadTherapistId: 'therapist-1',
    leadTherapistName: 'Wanos Mesfin (ዋኖስ መስፍን)',
    maxCapacity: 20,
    enrolledCount: 18,
    iconName: 'HeartHandshake',
    scheduleDescription: 'Intensive 2-3 day per week programs (Center & Home-based)',
    objectives: [
      'Replace challenging behaviors with functional alternative responses',
      'Build task endurance, attention span, and instruction-following',
      'Equip caregivers with positive reinforcement tools and emotional co-regulation',
      'Facilitate smooth transitions between home, therapy, and classroom'
    ],
    benefits: [
      'Calmer daily routines and successful community outings',
      'Measurable developmental milestones monitored weekly',
      'Empowered Ethiopian parents equipped with actionable behavior strategies'
    ]
  },
  {
    id: 'prog-4',
    title: 'Sensory Gym & Multi-Sensory Therapy',
    category: 'Sensory Therapy',
    description: 'Specialized sensory gym with platform swings, crash mats, tactile walls, and calming zones.',
    detailedOverview: 'Customized therapeutic sensory environments designed to regulate nervous system responses, vestibular balance, and proprioceptive awareness.',
    durationMinutes: 50,
    ageRange: 'Ages 2 – 12',
    leadTherapistId: 'therapist-3',
    leadTherapistName: 'Dawit Haile, B.Sc., OTR',
    maxCapacity: 20,
    enrolledCount: 19,
    iconName: 'Sparkles',
    scheduleDescription: 'Daily weekday afternoon sessions + Saturday morning play',
    objectives: [
      'Desensitize sensory hypersensitivity to sounds, lights, and textures',
      'Fulfill sensory-seeking behaviors with structured proprioceptive inputs',
      'Strengthen vestibular balance, spatial orientation, and motor planning',
      'Provide calming multi-sensory decompression for anxiety regulation'
    ],
    benefits: [
      'Fewer sensory meltdowns in crowded or noisy public spaces',
      'Enhanced physical stability and motor confidence',
      'More tranquil sleep habits and evening bedtime routines'
    ]
  },
  {
    id: 'prog-5',
    title: 'Special Needs Education & Shadow Teaching',
    category: 'Inclusive Education',
    description: 'Professional shadow teachers deployed to private and international schools across Addis Ababa.',
    detailedOverview: 'Connecting families with trained special needs educators who accompany children inside mainstream classrooms to foster inclusion, independence, and social participation.',
    durationMinutes: 60,
    ageRange: 'Ages 3 – 16',
    leadTherapistId: 'therapist-5',
    leadTherapistName: 'Yohannes Bekele, B.Ed.',
    maxCapacity: 25,
    enrolledCount: 22,
    iconName: 'Users',
    scheduleDescription: 'Full-day and half-day school support schedules across Addis Ababa',
    objectives: [
      'Facilitate academic engagement alongside mainstream teachers',
      'Prompt social interactions and cooperative peer play during recess',
      'Implement individualized accommodations and visual schedules in class',
      'Fade prompts systematically to build authentic student autonomy'
    ],
    benefits: [
      'Successful inclusion in Addis Ababa private and international schools',
      'Continuous daily reporting and coordination between school and parents',
      'Protection against bullying, isolation, and academic disengagement'
    ]
  },
  {
    id: 'prog-6',
    title: 'Early Intervention & Sign Language Support',
    category: 'Early Childhood',
    description: 'Developmental screening, toddler stimulation, and Ethiopian Sign Language communication.',
    detailedOverview: 'Early identification and intervention for toddlers showing developmental delays, combined with Ethiopian Sign Language (EthSL) instruction.',
    durationMinutes: 45,
    ageRange: 'Ages 18 mos – 6 yrs',
    leadTherapistId: 'therapist-6',
    leadTherapistName: 'Selamawit Tadesse, B.Sc.',
    maxCapacity: 16,
    enrolledCount: 14,
    iconName: 'Footprints',
    scheduleDescription: 'Monday, Wednesday and Saturday morning sessions',
    objectives: [
      'Early milestone tracking (crawling, pointing, gestures, vocal play)',
      'Teach basic Ethiopian Sign Language for non-verbal or pre-verbal communication',
      'Deliver multi-sensory stimulation through songs, tactile toys, and music',
      'Empower mothers and caregivers with responsive interaction skills'
    ],
    benefits: [
      'Crucial developmental gains during the most plastic brain development window',
      'Immediate functional communication before speech emerges',
      'Strong emotional bonding between caregiver and child'
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen',
    programId: 'prog-1',
    programTitle: 'Pediatric Occupational Therapy',
    date: '2026-10-19',
    startTime: '09:00',
    endTime: '09:45',
    room: 'Sensory Gym A',
    status: 'completed',
    notes: 'Focused on fine motor pinch with adaptive putty. Excellent engagement.'
  },
  {
    id: 'apt-102',
    childId: 'child-2',
    childName: 'Maya Patel',
    therapistId: 'therapist-2',
    therapistName: 'Amara Okafor',
    programId: 'prog-2',
    programTitle: 'Speech & Language Pathology',
    date: '2026-10-19',
    startTime: '10:00',
    endTime: '10:45',
    room: 'Speech Pod 1',
    status: 'completed',
    notes: 'Practiced bilabial sounds with puppet games.'
  },
  {
    id: 'apt-103',
    childId: 'child-3',
    childName: 'Noah Kaufman',
    therapistId: 'therapist-3',
    therapistName: 'David Alvarez',
    programId: 'prog-3',
    programTitle: 'Applied Behavior Analysis (ABA)',
    date: '2026-10-19',
    startTime: '11:15',
    endTime: '12:15',
    room: 'Behavioral Suite 2',
    status: 'completed',
    notes: 'Token reinforcement system worked smoothly.'
  },
  {
    id: 'apt-104',
    childId: 'child-4',
    childName: 'Zoe Gomez',
    therapistId: 'therapist-4',
    therapistName: 'Elena Rostova',
    programId: 'prog-6',
    programTitle: 'Pediatric Physical Therapy',
    date: '2026-10-19',
    startTime: '13:30',
    endTime: '14:15',
    room: 'Motor Gym B',
    status: 'confirmed',
    notes: 'Treadmill harness session and quad cane balance.'
  },
  {
    id: 'apt-105',
    childId: 'child-5',
    childName: 'Ethan Taylor',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen',
    programId: 'prog-1',
    programTitle: 'Pediatric Occupational Therapy',
    date: '2026-10-19',
    startTime: '14:30',
    endTime: '15:15',
    room: 'Sensory Gym A',
    status: 'scheduled',
    notes: 'Core stability on bolster swings.'
  },
  {
    id: 'apt-106',
    childId: 'child-6',
    childName: 'Aria Mercer',
    therapistId: 'therapist-6',
    therapistName: 'Marcus Bell',
    programId: 'prog-4',
    programTitle: 'Sensory Integration Therapy',
    date: '2026-10-19',
    startTime: '15:30',
    endTime: '16:20',
    room: 'Sensory Music Studio',
    status: 'scheduled',
    notes: 'Rhythmic auditory soothing and texture play.'
  },
  // Upcoming appointments for Liam Jenkins (Parent Portal view)
  {
    id: 'apt-107',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen',
    programId: 'prog-4',
    programTitle: 'Sensory Integration Gym & Therapy',
    date: '2026-10-21',
    startTime: '10:00',
    endTime: '10:50',
    room: 'Sensory Gym A',
    status: 'confirmed',
    notes: 'Vestibular swing regulation and deep pressure obstacle course.'
  },
  {
    id: 'apt-108',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen',
    programId: 'prog-1',
    programTitle: 'Pediatric Occupational Therapy',
    date: '2026-10-23',
    startTime: '09:00',
    endTime: '09:45',
    room: 'Sensory Gym A',
    status: 'scheduled',
    notes: 'Fine motor handwriting prep and buttoning practice.'
  },
  {
    id: 'apt-109',
    childId: 'child-2',
    childName: 'Maya Patel',
    therapistId: 'therapist-2',
    therapistName: 'Amara Okafor',
    programId: 'prog-2',
    programTitle: 'Speech & Language Pathology',
    date: '2026-10-20',
    startTime: '09:30',
    endTime: '10:15',
    room: 'Speech Pod 1',
    status: 'scheduled'
  },
  {
    id: 'apt-110',
    childId: 'child-3',
    childName: 'Noah Kaufman',
    therapistId: 'therapist-3',
    therapistName: 'David Alvarez',
    programId: 'prog-3',
    programTitle: 'Applied Behavior Analysis (ABA)',
    date: '2026-10-20',
    startTime: '11:00',
    endTime: '12:00',
    room: 'Behavioral Suite 2',
    status: 'scheduled'
  },
  {
    id: 'apt-111',
    childId: 'child-5',
    childName: 'Ethan Taylor',
    therapistId: 'therapist-2',
    therapistName: 'Amara Okafor',
    programId: 'prog-2',
    programTitle: 'Speech & Language Pathology',
    date: '2026-10-21',
    startTime: '11:30',
    endTime: '12:15',
    room: 'Speech Pod 2',
    status: 'scheduled'
  },
  {
    id: 'apt-112',
    childId: 'child-4',
    childName: 'Zoe Gomez',
    therapistId: 'therapist-4',
    therapistName: 'Elena Rostova',
    programId: 'prog-6',
    programTitle: 'Pediatric Physical Therapy',
    date: '2026-10-22',
    startTime: '14:00',
    endTime: '14:45',
    room: 'Motor Gym B',
    status: 'scheduled'
  }
];

export const INITIAL_SESSIONS: SessionRecord[] = [
  {
    id: 'sess-301',
    appointmentId: 'apt-101',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen, MS, OTR/L',
    date: '2026-10-19',
    durationMinutes: 45,
    programTitle: 'Pediatric Occupational Therapy',
    soapSubjective: 'Liam arrived with his mother Sarah in cheerful spirits. Mother reported Liam slept well and tolerated the car ride with his headphones without any agitation.',
    soapObjective: 'Participated in 15 min of proprioceptive sensory warm-up (weighted ball push, lycra tunnel crawl). Moved to table-top activity: utilized adaptive loop scissors to cut along 10 curved patterns. Achieved 85% line fidelity. Maintained pincer grasp on therapeutic putty for 12 hidden coin retrievals.',
    soapAssessment: 'Liam demonstrates notable gains in bilateral hand coordination. He consistently held the guide sheet with his left non-dominant hand while manipulating scissors with right hand. Vocalized spontaneous request: "Need more green putty please."',
    soapPlan: 'Continue graded scissor complexity next week. Send home therapeutic putty exercise sheet with mother. Introduce zipper board practice in next session.',
    milestonesWorkedOn: ['Bilateral hand dominance', 'Pincer grasp strengthening', 'Sensory self-regulation'],
    progressScore: 88,
    parentVisible: true,
    homeExercises: 'Have Liam roll small play-dough meatballs between thumb and pointer finger for 5 minutes before dinner.'
  },
  {
    id: 'sess-302',
    appointmentId: 'apt-102',
    childId: 'child-2',
    childName: 'Maya Patel',
    therapistId: 'therapist-2',
    therapistName: 'Amara Okafor, M.S., CCC-SLP',
    date: '2026-10-19',
    durationMinutes: 45,
    programTitle: 'Speech & Language Pathology',
    soapSubjective: 'Maya was enthusiastic and ran toward the speech pod clutching her favorite stuffed bunny.',
    soapObjective: 'Engaged in oral motor bubble blowing to foster lip seal. Practiced bilabial /p/, /b/, /m/ sounds using animal card matching games. Correctly produced 18/25 target trials with visual tactile cueing at lips.',
    soapAssessment: 'Maya responds exceptionally well to mirror feedback. Lip rounding strength is visibly improved from baseline 2 months ago.',
    soapPlan: 'Progress to 2-syllable word pairs (e.g., "puppy", "bubble") in following session.',
    milestonesWorkedOn: ['Bilabial lip closure', 'Phonemic awareness', 'Joint attention'],
    progressScore: 82,
    parentVisible: true,
    homeExercises: 'Blow bubbles together in front of mirror; have Maya pause and watch your lips say "Pop!"'
  },
  {
    id: 'sess-303',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    therapistId: 'therapist-1',
    therapistName: 'Michael Chen, MS, OTR/L',
    date: '2026-10-15',
    durationMinutes: 45,
    programTitle: 'Sensory Integration Gym & Therapy',
    soapSubjective: 'Sarah Jenkins reported Liam had mild over-stimulation at school earlier in the week due to fire drill alarms.',
    soapObjective: 'Utilized hammock swing with gentle linear oscillation for 12 minutes while Liam listened to calming rhythmic tracks. Practiced putting on ear defenders upon audio cue simulation.',
    soapAssessment: 'Liam showed immediate calming of breathing and heart rate with deep pressure weighted blanket overlay.',
    soapPlan: 'Collaborate with Liam’s school aide to ensure sensory break cards are honored promptly.',
    milestonesWorkedOn: ['Vestibular regulation', 'Acoustic desensitization', 'Self-advocacy'],
    progressScore: 92,
    parentVisible: true,
    homeExercises: '5 minutes of pillow sandwich deep pressure hugs before bedtime routine.'
  },
  {
    id: 'sess-304',
    childId: 'child-3',
    childName: 'Noah Kaufman',
    therapistId: 'therapist-3',
    therapistName: 'David Alvarez, M.Ed., BCBA',
    date: '2026-10-16',
    durationMinutes: 60,
    programTitle: 'Applied Behavior Analysis (ABA)',
    soapSubjective: 'Noah was high energy, bouncing between chairs upon entry.',
    soapObjective: 'Implemented 5-token visual board system. Noah completed 3 discrete trial work intervals of 10 minutes each with zero elopement attempts.',
    soapAssessment: 'High efficacy of chosen reinforcer (Lego construction time). Task engagement reached 80%.',
    soapPlan: 'Fade token frequency from every 2 min to every 3.5 min.',
    milestonesWorkedOn: ['Task persistence', 'Visual schedule compliance', 'Delay of gratification'],
    progressScore: 84,
    parentVisible: true,
    homeExercises: 'Use 3-step picture chart before screen time.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-401',
    invoiceNumber: 'INV-2026-089',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    guardianName: 'Sarah Jenkins',
    guardianEmail: 'sarah.jenkins@example.com',
    issueDate: '2026-10-01',
    dueDate: '2026-10-25',
    items: [
      { id: 'item-1', description: 'Pediatric Occupational Therapy (4 Sessions @ $120)', quantity: 4, unitPrice: 120, total: 480 },
      { id: 'item-2', description: 'Sensory Integration Gym Lab (2 Sessions @ $95)', quantity: 2, unitPrice: 95, total: 190 }
    ],
    subtotal: 670,
    discount: 50,
    total: 620,
    amountPaid: 620,
    balanceDue: 0,
    status: 'paid',
    paymentMethod: 'Credit Card (Visa ending in 4108)',
    paidAt: '2026-10-05'
  },
  {
    id: 'inv-402',
    invoiceNumber: 'INV-2026-092',
    childId: 'child-1',
    childName: 'Liam Jenkins',
    guardianName: 'Sarah Jenkins',
    guardianEmail: 'sarah.jenkins@example.com',
    issueDate: '2026-10-15',
    dueDate: '2026-11-05',
    items: [
      { id: 'item-3', description: 'Pediatric Occupational Therapy (4 Sessions @ $120)', quantity: 4, unitPrice: 120, total: 480 },
      { id: 'item-4', description: 'Sensory Integration Gym Lab (3 Sessions @ $95)', quantity: 3, unitPrice: 95, total: 285 }
    ],
    subtotal: 765,
    discount: 0,
    total: 765,
    amountPaid: 0,
    balanceDue: 765,
    status: 'pending'
  },
  {
    id: 'inv-403',
    invoiceNumber: 'INV-2026-084',
    childId: 'child-2',
    childName: 'Maya Patel',
    guardianName: 'Priya Patel',
    guardianEmail: 'priya.patel@example.com',
    issueDate: '2026-09-28',
    dueDate: '2026-10-18',
    items: [
      { id: 'item-5', description: 'Speech & Language Pathology (6 Sessions @ $130)', quantity: 6, unitPrice: 130, total: 780 }
    ],
    subtotal: 780,
    discount: 0,
    total: 780,
    amountPaid: 0,
    balanceDue: 780,
    status: 'overdue'
  },
  {
    id: 'inv-404',
    invoiceNumber: 'INV-2026-085',
    childId: 'child-3',
    childName: 'Noah Kaufman',
    guardianName: 'Jessica Kaufman',
    guardianEmail: 'jess.kaufman@example.com',
    issueDate: '2026-10-02',
    dueDate: '2026-10-26',
    items: [
      { id: 'item-6', description: 'Applied Behavior Analysis (8 Sessions @ $140)', quantity: 8, unitPrice: 140, total: 1120 }
    ],
    subtotal: 1120,
    discount: 100,
    total: 1020,
    amountPaid: 1020,
    balanceDue: 0,
    status: 'paid',
    paymentMethod: 'HSA / Flex Card',
    paidAt: '2026-10-03'
  },
  {
    id: 'inv-405',
    invoiceNumber: 'INV-2026-086',
    childId: 'child-4',
    childName: 'Zoe Gomez',
    guardianName: 'Carlos Gomez',
    guardianEmail: 'carlos.gomez@example.com',
    issueDate: '2026-10-05',
    dueDate: '2026-10-29',
    items: [
      { id: 'item-7', description: 'Pediatric Physical Therapy (4 Sessions @ $125)', quantity: 4, unitPrice: 125, total: 500 }
    ],
    subtotal: 500,
    discount: 0,
    total: 500,
    amountPaid: 0,
    balanceDue: 500,
    status: 'pending'
  },
  {
    id: 'inv-406',
    invoiceNumber: 'INV-2026-077',
    childId: 'child-5',
    childName: 'Ethan Taylor',
    guardianName: 'Amanda Taylor',
    guardianEmail: 'amanda.t@example.com',
    issueDate: '2026-09-15',
    dueDate: '2026-10-08',
    items: [
      { id: 'item-8', description: 'Occupational Therapy & Motor Guidance', quantity: 4, unitPrice: 120, total: 480 }
    ],
    subtotal: 480,
    discount: 0,
    total: 480,
    amountPaid: 0,
    balanceDue: 480,
    status: 'overdue'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '10 minutes ago',
    actorName: 'Michael Chen',
    actorRole: 'Therapist',
    action: 'Logged SOAP progress note for',
    targetName: 'Liam Jenkins',
    category: 'clinical'
  },
  {
    id: 'act-2',
    timestamp: '35 minutes ago',
    actorName: 'Front Reception',
    actorRole: 'Staff',
    action: 'Checked in scheduled appointment for',
    targetName: 'Maya Patel',
    category: 'scheduling'
  },
  {
    id: 'act-3',
    timestamp: '2 hours ago',
    actorName: 'Sarah Jenkins',
    actorRole: 'Parent',
    action: 'Confirmed upcoming appointment for Oct 21',
    targetName: 'Sensory Integration Gym',
    category: 'scheduling'
  },
  {
    id: 'act-4',
    timestamp: '3 hours ago',
    actorName: 'Dr. Hanna Vance',
    actorRole: 'Admin',
    action: 'Updated quarterly clinical milestone report',
    targetName: 'Q3 Development Summary',
    category: 'administrative'
  },
  {
    id: 'act-5',
    timestamp: 'Yesterday at 4:15 PM',
    actorName: 'Billing System',
    actorRole: 'System',
    action: 'Recorded payment of $1,020 for Invoice #085',
    targetName: 'Jessica Kaufman (Noah Kaufman)',
    category: 'billing'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Session Progress Note',
    message: 'Michael Chen added a detailed SOAP note for Liam Jenkins.',
    timestamp: '15m ago',
    unread: true,
    type: 'progress'
  },
  {
    id: 'notif-2',
    title: 'Appointment Confirmed',
    message: 'Sensory Integration session with Liam Jenkins confirmed for Oct 21, 10:00 AM.',
    timestamp: '2h ago',
    unread: true,
    type: 'appointment'
  },
  {
    id: 'notif-3',
    title: 'Pending Invoice Reminder',
    message: 'Invoice #092 ($765) issued for Liam Jenkins.',
    timestamp: '1d ago',
    unread: false,
    type: 'billing'
  },
  {
    id: 'notif-4',
    title: 'Milestone Mastered! 🌟',
    message: 'Liam Jenkins achieved 95% mastery on Sensory Self-Advocacy goal.',
    timestamp: '2d ago',
    unread: false,
    type: 'progress'
  }
];

export const INITIAL_SETTINGS: OrganizationSettings = {
  name: 'Mela Special Needs Service (መላ የልዩ-ፍላጎት አገልግሎት)',
  tagline: 'Special Needs Education, Pediatric Therapy & Inclusive Support',
  email: 'melaspecialneeds@gmail.com',
  phone: '+251 717 484 604 / +251 919 484 604',
  address: 'Addis Ababa, Ethiopia (Clinic, In-Home Visits & School Deployments across Bole, Megenagna, CMC & All Sub-cities)',
  licenseNumber: 'ET-SN-AA-2023-8841',
  operatingHours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 8:30 AM – 4:00 PM (EAT)',
  smsReminders: true,
  emailProgressReports: true,
  billingAlerts: true,
  compactDensity: false
};
