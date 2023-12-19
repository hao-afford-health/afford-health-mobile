export const eventsData = [
  {
    date: '08/23/2023',
    category: 'Preventative Care',
    title: 'Annual Exam', 
    tags: ['Active Event', 'Details Added', 'Alert'],
    total: 30.00,
    insurance_plan: 'Blue Sheild of CA - PPO',
    deductible: 700,
    paid: 350,
    healthcare_providers: [
      {
        type: 'Medical Doctor',
        network: 'In-network',
        name: 'David Smith, MD',
        organization: 'One Medical Group',
        services: [
          {
            total: 0.00,
            items: [
              {
                code: '99396 25',
                status: 'Alert',
                description: 'Well-patient visit for an established patient who is between ages of 40 and 64.',
                detail: 'Heads up! We noticed this service code includes an optional modifier (25), indicating there was a complication with the standard procedure. Your insurance provider may require documentation to justify the additional expense. We recommend reaching out to your healthcare provider for clarification / assistance.',
                insurance_plan_charges: [
                  {description: 'Billed By Provider', amount: 747.00},
                  {description: 'Allowed by Your Plan', amount: 570.27},
                  {description: 'Paid by Your Plan', amount: 570.27},
                ],
                patient_charges: [
                  {description: 'Non-covered Charges', amount: 0.00},
                  {description: 'Deductible', amount: 0.00},
                  {description: 'Co-payment', amount: 0.00},
                ],
              },
              {
                code: '36415',
                status: 'Covered',
                description: 'Venipuncture / blood sample (sent to lab).',
              }
            ]
          }
        ]
      },
      {
        type: 'Laboratory',
        network: 'In-network',
        name: 'Labcorp',
        organization: 'Laboratory Corporation of America Holdings',
        services: [
          {
            total: 30.00,
            items: [
              {
                code: '80053',
                status: 'Balance Due',
                description: 'Comprehensive metabolic panel (CMP) test; measures the level of 14 chemicals in the bloodstream.',
              },
              {
                code: '85027',
                status: 'Balance Due',
                description: 'Counts the red and white blood cells and platelets (thrombocytes); measures the hemoglobin, and calculates the hematocrit (packed red cell volume) in a blood samples.',
              },
              {
                code: '80061',
                status: 'Balance Due',
                description: 'Lipid panel test; measures the level of cholesterol and fats (triglycerides) in the bloodstream',
              },
              {
                code: '80336',
                status: 'Coverd',
                description: 'Measures sugar (ATC) levels in the bloodstream.',
              },
              {
                code: '84443',
                status: 'Coverd',
                description: 'Measures the amount of thyroid-stimulating hormone (TSH; helps regulate thyroid function) in the bloodstream.',
              },
            ]
          },
          {
            total: 0.00,
            items: [
              {
                code: '82274',
                status: 'Covered',
                description: 'Fecal immunochemical test (FIT) for hidden blood in a fecal specimen; used to screen for colon canceer.',
              },
            ]
          },
        ]
      },
    ]
  },
];