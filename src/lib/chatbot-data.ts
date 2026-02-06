// Chatbot decision tree and symptom mapping data
// Supports both English and Traditional Chinese

export type Locale = 'en' | 'zh-TW';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  type?: 'text' | 'quick_replies' | 'results' | 'emergency';
  options?: QuickReplyOption[];
  results?: ConditionResult[];
  timestamp: number;
}

export interface QuickReplyOption {
  id: string;
  label: string;
  value: string;
  action: 'select_body_area' | 'select_symptom' | 'select_duration' | 'select_severity' | 'view_condition' | 'book_appointment' | 'start_over' | 'close';
}

export interface ConditionResult {
  conditionId: string;
  title: string;
  shortDescription: string;
  matchScore: 'high' | 'medium' | 'low';
  categoryId: string;
  categoryName: string;
}

export interface BodyArea {
  id: string;
  label: Record<Locale, string>;
  symptoms: Symptom[];
}

export interface Symptom {
  id: string;
  label: Record<Locale, string>;
  relatedConditions: string[];
  isEmergency?: boolean;
  emergencyMessage?: Record<Locale, string>;
  emergencyKeywords?: string[];
}

export interface ConditionMapping {
  id: string;
  categoryId: string;
  keywords: string[];
  symptoms: string[];
  bodyAreas: string[];
  emergencyKeywords?: string[];
}

// Body areas with their symptoms
export const bodyAreas: BodyArea[] = [
  {
    id: 'head_brain',
    label: { en: 'Head / Brain', 'zh-TW': '頭部 / 腦部' },
    symptoms: [
      { id: 'severe_headache', label: { en: 'Severe sudden headache', 'zh-TW': '突發嚴重頭痛' }, relatedConditions: ['cerebral_aneurysm', 'acute_stroke', 'csdh'], emergencyKeywords: ['thunderclap', 'worst headache'] },
      { id: 'vision_problems', label: { en: 'Vision problems / Double vision', 'zh-TW': '視力問題 / 重影' }, relatedConditions: ['cerebral_aneurysm', 'acute_stroke', 'carotid_stenosis'] },
      { id: 'neck_pain', label: { en: 'Neck pain / Stiffness', 'zh-TW': '頸部疼痛 / 僵硬' }, relatedConditions: ['cerebral_aneurysm', 'carotid_stenosis'] },
      { id: 'stroke_symptoms', label: { en: 'Face drooping / Arm weakness / Speech difficulty', 'zh-TW': '面部下垂 / 手臂無力 / 言語困難' }, relatedConditions: ['acute_stroke', 'carotid_stenosis'], isEmergency: true, emergencyMessage: { en: 'These are stroke symptoms. Call emergency services immediately.', 'zh-TW': '這些是中風症狀。請立即致電緊急服務。' } },
      { id: 'confusion', label: { en: 'Confusion / Memory loss', 'zh-TW': '神志不清 / 記憶力減退' }, relatedConditions: ['acute_stroke', 'csdh', 'dbs'], isEmergency: true, emergencyMessage: { en: 'Sudden confusion may indicate stroke. Seek emergency care.', 'zh-TW': '突發神志不清可能表示中風。請尋求緊急醫療。' } },
      { id: 'balance_issues', label: { en: 'Balance problems / Dizziness', 'zh-TW': '平衡問題 / 頭暈' }, relatedConditions: ['acute_stroke', 'dbs', 'avm'] },
      { id: 'tremor', label: { en: 'Tremor / Shaking', 'zh-TW': '震顫 / 顫抖' }, relatedConditions: ['dbs'] },
      { id: 'rigidity', label: { en: 'Muscle stiffness / Rigidity', 'zh-TW': '肌肉僵硬 / 強直' }, relatedConditions: ['dbs'] },
      { id: 'seizures', label: { en: 'Seizures', 'zh-TW': '癲癇發作' }, relatedConditions: ['avm', 'cerebral_aneurysm'], isEmergency: true },
    ]
  },
  {
    id: 'sleep',
    label: { en: 'Sleep / Breathing', 'zh-TW': '睡眠 / 呼吸' },
    symptoms: [
      { id: 'loud_snoring', label: { en: 'Loud snoring', 'zh-TW': '大聲打鼾' }, relatedConditions: ['sleep_apnea'] },
      { id: 'breathing_pauses', label: { en: 'Breathing pauses during sleep', 'zh-TW': '睡眠時呼吸暫停' }, relatedConditions: ['sleep_apnea'], isEmergency: true, emergencyMessage: { en: 'Breathing pauses can be life-threatening. Seek immediate evaluation.', 'zh-TW': '呼吸暫停可能危及生命。請立即求醫。' } },
      { id: 'daytime_sleepiness', label: { en: 'Excessive daytime sleepiness', 'zh-TW': '日間過度嗜睡' }, relatedConditions: ['sleep_apnea'] },
      { id: 'morning_headaches', label: { en: 'Morning headaches', 'zh-TW': '晨起頭痛' }, relatedConditions: ['sleep_apnea'] },
      { id: 'cpap_intolerance', label: { en: 'Cannot tolerate CPAP machine', 'zh-TW': '無法耐受正壓呼吸機' }, relatedConditions: ['sleep_apnea'] },
    ]
  },
  {
    id: 'pelvic_female',
    label: { en: 'Pelvic (Female)', 'zh-TW': '盆腔（女性）' },
    symptoms: [
      { id: 'heavy_periods', label: { en: 'Heavy menstrual bleeding', 'zh-TW': '經血過多' }, relatedConditions: ['uterine_fibroids'] },
      { id: 'pelvic_pain', label: { en: 'Pelvic pain / Pressure', 'zh-TW': '盆腔疼痛 / 壓迫感' }, relatedConditions: ['uterine_fibroids', 'pelvic_congestion'] },
      { id: 'frequent_urination', label: { en: 'Frequent urination', 'zh-TW': '頻尿' }, relatedConditions: ['uterine_fibroids', 'prostate_enlargement'] },
      { id: 'chronic_pelvic_pain', label: { en: 'Chronic pelvic pain (standing/walking worse)', 'zh-TW': '慢性盆腔疼痛（站立/行走時加重）' }, relatedConditions: ['pelvic_congestion'] },
      { id: 'varicose_veins_pelvis', label: { en: 'Varicose veins in pelvic area', 'zh-TW': '盆腔靜脈曲張' }, relatedConditions: ['pelvic_congestion'] },
    ]
  },
  {
    id: 'pelvic_male',
    label: { en: 'Pelvic (Male)', 'zh-TW': '盆腔（男性）' },
    symptoms: [
      { id: 'weak_stream', label: { en: 'Weak urine stream', 'zh-TW': '尿流無力' }, relatedConditions: ['prostate_enlargement'] },
      { id: 'urgency', label: { en: 'Frequent/urgent need to urinate', 'zh-TW': '尿頻/尿急' }, relatedConditions: ['prostate_enlargement'] },
      { id: 'nighttime_urination', label: { en: 'Nighttime urination (nocturia)', 'zh-TW': '夜尿' }, relatedConditions: ['prostate_enlargement'] },
      { id: 'incomplete_emptying', label: { en: 'Feeling of incomplete bladder emptying', 'zh-TW': '排尿不盡感' }, relatedConditions: ['prostate_enlargement'] },
      { id: 'scrotal_pain', label: { en: 'Scrotal pain / Swollen veins', 'zh-TW': '陰囊疼痛 / 靜脈腫脹' }, relatedConditions: ['varicocele'] },
      { id: 'infertility', label: { en: 'Infertility issues', 'zh-TW': '不育問題' }, relatedConditions: ['varicocele'] },
    ]
  },
  {
    id: 'legs',
    label: { en: 'Legs / Veins', 'zh-TW': '腿部 / 靜脈' },
    symptoms: [
      { id: 'visible_varicose', label: { en: 'Visible varicose veins', 'zh-TW': '明顯靜脈曲張' }, relatedConditions: ['varicose_veins'] },
      { id: 'leg_pain_swelling', label: { en: 'Leg pain, swelling, heaviness', 'zh-TW': '腿部疼痛、腫脹、沉重感' }, relatedConditions: ['varicose_veins', 'peripheral_vascular'] },
      { id: 'walking_pain', label: { en: 'Leg pain when walking (relieved by rest)', 'zh-TW': '走路時腿痛（休息後緩解）' }, relatedConditions: ['peripheral_vascular'] },
      { id: 'skin_changes', label: { en: 'Skin discoloration / ulcers on legs', 'zh-TW': '腿部皮膚變色/潰瘍' }, relatedConditions: ['peripheral_vascular', 'varicose_veins'], isEmergency: true, emergencyMessage: { en: 'Leg ulcers require prompt medical attention.', 'zh-TW': '腿部潰瘍需要及時醫療關注。' } },
      { id: 'cold_feet', label: { en: 'Cold feet / Weak pulse', 'zh-TW': '腳部冰冷 / 脈搏微弱' }, relatedConditions: ['peripheral_vascular'] },
    ]
  },
  {
    id: 'knees',
    label: { en: 'Knees', 'zh-TW': '膝蓋' },
    symptoms: [
      { id: 'knee_pain', label: { en: 'Chronic knee pain', 'zh-TW': '慢性膝蓋疼痛' }, relatedConditions: ['knee_arthritis'] },
      { id: 'knee_stiffness', label: { en: 'Knee stiffness (especially morning)', 'zh-TW': '膝蓋僵硬（尤其早晨）' }, relatedConditions: ['knee_arthritis'] },
      { id: 'knee_swelling', label: { en: 'Knee swelling', 'zh-TW': '膝蓋腫脹' }, relatedConditions: ['knee_arthritis'] },
      { id: 'not_ready_surgery', label: { en: 'Not ready for knee replacement', 'zh-TW': '尚未準備接受膝關節置換' }, relatedConditions: ['knee_arthritis'] },
    ]
  },
  {
    id: 'feet',
    label: { en: 'Feet', 'zh-TW': '足部' },
    symptoms: [
      { id: 'heel_pain', label: { en: 'Heel pain (especially morning)', 'zh-TW': '足跟疼痛（尤其早晨）' }, relatedConditions: ['plantar_fasciitis'] },
      { id: 'heel_tenderness', label: { en: 'Tenderness in arch of foot', 'zh-TW': '足弓壓痛' }, relatedConditions: ['plantar_fasciitis'] },
      { id: 'treatment_failed', label: { en: 'Failed orthotics/physical therapy', 'zh-TW': '矯形鞋墊/物理治療無效' }, relatedConditions: ['plantar_fasciitis'] },
    ]
  },
  {
    id: 'abdomen',
    label: { en: 'Abdomen / Digestive', 'zh-TW': '腹部 / 消化' },
    symptoms: [
      { id: 'hemorrhoid_bleeding', label: { en: 'Rectal bleeding', 'zh-TW': '直腸出血' }, relatedConditions: ['hemorrhoids'], isEmergency: true, emergencyMessage: { en: 'Significant bleeding requires immediate medical attention.', 'zh-TW': '大量出血需要立即醫療關注。' } },
      { id: 'hemorrhoid_pain', label: { en: 'Pain/itching around anus', 'zh-TW': '肛門周圍疼痛/瘙癢' }, relatedConditions: ['hemorrhoids'] },
      { id: 'liver_tumor', label: { en: 'Liver tumor / Hepatocellular carcinoma', 'zh-TW': '肝腫瘤 / 肝癌' }, relatedConditions: ['oncology_intervention'] },
      { id: 'kidney_tumor', label: { en: 'Kidney tumor', 'zh-TW': '腎腫瘤' }, relatedConditions: ['oncology_intervention'] },
      { id: 'lung_tumor', label: { en: 'Lung tumor', 'zh-TW': '肺腫瘤' }, relatedConditions: ['oncology_intervention'] },
      { id: 'abdominal_aorta', label: { en: 'Abdominal aortic aneurysm (diagnosed)', 'zh-TW': '腹主動脈瘤（已確診）' }, relatedConditions: ['aortic_disease'], isEmergency: true, emergencyMessage: { en: 'Aortic aneurysm requires immediate specialist evaluation.', 'zh-TW': '主動脈瘤需要立即專科評估。' } },
    ]
  },
  {
    id: 'chest',
    label: { en: 'Chest / Torso', 'zh-TW': '胸部 / 軀幹' },
    symptoms: [
      { id: 'chest_pain', label: { en: 'Chest pain', 'zh-TW': '胸痛' }, relatedConditions: [], isEmergency: true, emergencyMessage: { en: 'CHEST PAIN requires IMMEDIATE emergency care. Call emergency services now.', 'zh-TW': '胸痛需要立即緊急醫療。請立即致電緊急服務。' } },
      { id: 'shortness_breath', label: { en: 'Shortness of breath', 'zh-TW': '呼吸困難' }, relatedConditions: ['aortic_disease', 'sleep_apnea'], isEmergency: true, emergencyMessage: { en: 'Severe shortness of breath requires immediate care.', 'zh-TW': '嚴重呼吸困難需要立即醫療。' } },
      { id: 'thoracic_aorta', label: { en: 'Thoracic aortic aneurysm (diagnosed)', 'zh-TW': '胸主動脈瘤（已確診）' }, relatedConditions: ['aortic_disease'], isEmergency: true },
      { id: 'back_pain', label: { en: 'Severe back pain (sudden)', 'zh-TW': '突發嚴重背痛' }, relatedConditions: ['aortic_disease'], isEmergency: true, emergencyMessage: { en: 'Sudden severe back pain may indicate aortic emergency.', 'zh-TW': '突發嚴重背痛可能表示主動脈急症。' } },
    ]
  },
];

// Condition mappings to treatments
export const conditionMappings: ConditionMapping[] = [
  { id: 'cerebral_aneurysm', categoryId: 'neurovascular', keywords: ['aneurysm', 'brain aneurysm', 'cerebral aneurysm'], symptoms: ['severe_headache', 'vision_problems', 'neck_pain', 'seizures'], bodyAreas: ['head_brain'] },
  { id: 'acute_stroke', categoryId: 'neurovascular', keywords: ['stroke', 'blood clot brain', 'ischemic stroke'], symptoms: ['stroke_symptoms', 'confusion', 'balance_issues', 'vision_problems'], bodyAreas: ['head_brain'], emergencyKeywords: ['face drooping', 'arm weakness', 'speech difficulty'] },
  { id: 'carotid_stenosis', categoryId: 'neurovascular', keywords: ['carotid', 'carotid artery', 'neck artery'], symptoms: ['vision_problems', 'stroke_symptoms', 'neck_pain'], bodyAreas: ['head_brain', 'neck'] },
  { id: 'csdh', categoryId: 'neurovascular', keywords: ['subdural hematoma', 'chronic subdural', 'brain bleed', 'csdh'], symptoms: ['confusion', 'severe_headache', 'balance_issues'], bodyAreas: ['head_brain'] },
  { id: 'avm', categoryId: 'neurovascular', keywords: ['avm', 'arteriovenous malformation', 'brain avm', 'dural fistula'], symptoms: ['seizures', 'balance_issues', 'headache'], bodyAreas: ['head_brain'] },
  { id: 'dbs', categoryId: 'neuromodulation', keywords: ['parkinson', 'dbs', 'deep brain stimulation', 'tremor', 'essential tremor', 'dystonia'], symptoms: ['tremor', 'rigidity', 'balance_issues', 'confusion'], bodyAreas: ['head_brain'] },
  { id: 'sleep_apnea', categoryId: 'neuromodulation', keywords: ['sleep apnea', 'inspire therapy', 'hypoglossal', 'snoring', 'osa'], symptoms: ['loud_snoring', 'breathing_pauses', 'daytime_sleepiness', 'morning_headaches', 'cpap_intolerance'], bodyAreas: ['sleep', 'head_brain'] },
  { id: 'uterine_fibroids', categoryId: 'urogenital', keywords: ['uterine fibroid', 'fibroids', 'uae', 'heavy periods'], symptoms: ['heavy_periods', 'pelvic_pain', 'frequent_urination'], bodyAreas: ['pelvic_female'] },
  { id: 'prostate_enlargement', categoryId: 'urogenital', keywords: ['bph', 'prostate enlargement', 'prostate', 'pae', 'benign prostatic'], symptoms: ['weak_stream', 'urgency', 'nighttime_urination', 'incomplete_emptying', 'frequent_urination'], bodyAreas: ['pelvic_male'] },
  { id: 'pelvic_congestion', categoryId: 'urogenital', keywords: ['pelvic congestion', 'varicocele', 'ovarian vein'], symptoms: ['chronic_pelvic_pain', 'varicose_veins_pelvis'], bodyAreas: ['pelvic_female', 'pelvic_male'] },
  { id: 'varicocele', categoryId: 'urogenital', keywords: ['varicocele', 'scrotal veins', 'male infertility'], symptoms: ['scrotal_pain', 'infertility'], bodyAreas: ['pelvic_male'] },
  { id: 'varicose_veins', categoryId: 'urogenital', keywords: ['varicose veins', 'spider veins', 'venous insufficiency', 'evla', 'rfa'], symptoms: ['visible_varicose', 'leg_pain_swelling', 'skin_changes'], bodyAreas: ['legs'] },
  { id: 'hemorrhoids', categoryId: 'gastrointestinal', keywords: ['hemorrhoids', 'hemorrhoid', 'piles', 'hae'], symptoms: ['hemorrhoid_bleeding', 'hemorrhoid_pain'], bodyAreas: ['abdomen'] },
  { id: 'knee_arthritis', categoryId: 'musculoskeletal', keywords: ['knee arthritis', 'osteoarthritis knee', 'gae', 'knee pain'], symptoms: ['knee_pain', 'knee_stiffness', 'knee_swelling', 'not_ready_surgery'], bodyAreas: ['knees'] },
  { id: 'plantar_fasciitis', categoryId: 'musculoskeletal', keywords: ['plantar fasciitis', 'heel pain', 'foot pain', 'pfe'], symptoms: ['heel_pain', 'heel_tenderness', 'treatment_failed'], bodyAreas: ['feet'] },
  { id: 'oncology_intervention', categoryId: 'vascular', keywords: ['liver cancer', 'liver tumor', 'tace', 'y-90', 'radioembolization', 'kidney tumor', 'lung tumor', 'ablation'], symptoms: ['liver_tumor', 'kidney_tumor', 'lung_tumor'], bodyAreas: ['abdomen', 'chest'] },
  { id: 'peripheral_vascular', categoryId: 'vascular', keywords: ['peripheral artery disease', 'pad', 'claudication', 'leg artery', 'peripheral vascular'], symptoms: ['walking_pain', 'leg_pain_swelling', 'cold_feet', 'skin_changes'], bodyAreas: ['legs'] },
  { id: 'aortic_disease', categoryId: 'vascular', keywords: ['aortic aneurysm', 'aaa', 'taa', 'evar', 'tevar', 'aortic'], symptoms: ['abdominal_aorta', 'thoracic_aorta', 'back_pain'], bodyAreas: ['abdomen', 'chest'], emergencyKeywords: ['severe back pain', 'tearing pain'] },
];

// Emergency keywords that trigger immediate alerts
export const emergencyKeywords = [
  { en: 'chest pain', 'zh-TW': '胸痛' },
  { en: 'can\'t breathe', 'zh-TW': '無法呼吸' },
  { en: 'unconscious', 'zh-TW': '昏迷' },
  { en: 'severe bleeding', 'zh-TW': '大量出血' },
  { en: 'stroke', 'zh-TW': '中風' },
  { en: 'heart attack', 'zh-TW': '心臟病發' },
  { en: 'face drooping', 'zh-TW': '面部下垂' },
  { en: 'arm weakness', 'zh-TW': '手臂無力' },
  { en: 'speech slurred', 'zh-TW': '口齒不清' },
];

// Conversation flow steps
export type ConversationStep = 
  | 'welcome'
  | 'body_area'
  | 'symptoms'
  | 'duration'
  | 'severity'
  | 'results'
  | 'emergency'
  | 'complete';

export interface ConversationState {
  step: ConversationStep;
  selectedBodyArea?: string;
  selectedSymptoms: string[];
  duration?: string;
  severity?: string;
  matchedConditions: ConditionResult[];
  isEmergency: boolean;
  emergencyMessage?: string;
}

// Initial welcome messages
export function getWelcomeMessage(lang: Locale): string {
  return lang === 'zh-TW' 
    ? '您好！我是BEVA診所的虛擬助手。我可以幫助您了解哪些治療項目可能適合您的情況。請注意，我無法提供醫療診斷，如有緊急情況請立即就醫。'
    : 'Hello! I\'m the BEVA Clinic virtual assistant. I can help you learn which treatments might be suitable for your condition. Please note that I cannot provide medical diagnoses. For emergencies, please seek immediate medical care.';
}

// Duration options
export function getDurationOptions(lang: Locale): QuickReplyOption[] {
  const labels = lang === 'zh-TW' 
    ? ['少於1週', '1-4週', '1-6個月', '超過6個月']
    : ['Less than 1 week', '1-4 weeks', '1-6 months', 'More than 6 months'];
  
  return [
    { id: 'dur_1', label: labels[0], value: 'less_than_week', action: 'select_duration' },
    { id: 'dur_2', label: labels[1], value: '1_to_4_weeks', action: 'select_duration' },
    { id: 'dur_3', label: labels[2], value: '1_to_6_months', action: 'select_duration' },
    { id: 'dur_4', label: labels[3], value: 'more_than_6_months', action: 'select_duration' },
  ];
}

// Severity options
export function getSeverityOptions(lang: Locale): QuickReplyOption[] {
  const labels = lang === 'zh-TW'
    ? ['輕微 - 不影響日常活動', '中度 - 有些影響', '嚴重 - 顯著影響生活品質']
    : ['Mild - does not affect daily activities', 'Moderate - some impact', 'Severe - significantly affects quality of life'];
  
  return [
    { id: 'sev_mild', label: labels[0], value: 'mild', action: 'select_severity' },
    { id: 'sev_mod', label: labels[1], value: 'moderate', action: 'select_severity' },
    { id: 'sev_sev', label: labels[2], value: 'severe', action: 'select_severity' },
  ];
}

// Get body area options - includes direct access options for common conditions
export function getBodyAreaOptions(lang: Locale): QuickReplyOption[] {
  const directOptions: QuickReplyOption[] = [
    {
      id: 'direct_hemorrhoids',
      label: lang === 'zh-TW' ? '🩸 痔瘡 (直腸出血/肛門疼痛)' : '🩸 Hemorrhoids (Rectal bleeding/Anal pain)',
      value: 'hemorrhoids',
      action: 'select_body_area' as const
    }
  ];
  
  const areaOptions: QuickReplyOption[] = bodyAreas.map(area => ({
    id: `area_${area.id}`,
    label: area.label[lang],
    value: area.id,
    action: 'select_body_area' as const
  }));
  
  return [...directOptions, ...areaOptions];
}

// Get symptoms for a body area
export function getSymptomOptions(lang: Locale, bodyAreaId: string): QuickReplyOption[] {
  const area = bodyAreas.find(a => a.id === bodyAreaId);
  if (!area) return [];
  
  return area.symptoms.map(symptom => ({
    id: `sym_${symptom.id}`,
    label: symptom.label[lang],
    value: symptom.id,
    action: 'select_symptom'
  }));
}

// Check for emergency symptoms
export function checkEmergency(symptomIds: string[], lang: Locale): { isEmergency: boolean; message?: string } {
  for (const area of bodyAreas) {
    for (const symptom of area.symptoms) {
      if (symptomIds.includes(symptom.id) && symptom.isEmergency) {
        return {
          isEmergency: true,
          message: symptom.emergencyMessage?.[lang] || (lang === 'zh-TW' ? '這是緊急症狀。請立即尋求醫療協助。' : 'This is an emergency symptom. Please seek immediate medical attention.')
        };
      }
    }
  }
  return { isEmergency: false };
}

// Match conditions based on symptoms
export function matchConditions(symptomIds: string[], lang: Locale, categoryNames: Record<string, Record<Locale, string>>): ConditionResult[] {
  const scores: Record<string, { score: number; matchedSymptoms: number; totalSymptoms: number }> = {};
  
  for (const mapping of conditionMappings) {
    const matchedSymptoms = mapping.symptoms.filter(s => symptomIds.includes(s));
    if (matchedSymptoms.length > 0) {
      const score = (matchedSymptoms.length / mapping.symptoms.length) + (matchedSymptoms.length * 0.1);
      scores[mapping.id] = {
        score,
        matchedSymptoms: matchedSymptoms.length,
        totalSymptoms: mapping.symptoms.length
      };
    }
  }
  
  // Sort by score and get top matches
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 3);
  
  return sorted.map(([id, data]) => {
    const mapping = conditionMappings.find(m => m.id === id)!;
    const conditionData = getConditionData(id, lang);
    
    let matchScore: 'high' | 'medium' | 'low' = 'low';
    if (data.score >= 0.7) matchScore = 'high';
    else if (data.score >= 0.4) matchScore = 'medium';
    
    return {
      conditionId: id,
      title: conditionData.title,
      shortDescription: conditionData.shortDescription,
      matchScore,
      categoryId: mapping.categoryId,
      categoryName: categoryNames[mapping.categoryId]?.[lang] || mapping.categoryId
    };
  });
}

// Get condition display data
function getConditionData(conditionId: string, lang: Locale): { title: string; shortDescription: string } {
  // This maps to the dictionary data - will be passed in from component
  const conditions: Record<string, Record<Locale, { title: string; shortDescription: string }>> = {
    cerebral_aneurysm: {
      en: { title: 'Cerebral Aneurysm Embolization', shortDescription: 'Minimally invasive treatment for brain aneurysms using advanced coiling and flow diversion techniques.' },
      'zh-TW': { title: '腦動脈瘤栓塞術', shortDescription: '採用先進的栓塞及血流導向技術，以微創方式治療腦動脈瘤。' }
    },
    acute_stroke: {
      en: { title: 'Acute Stroke Revascularization', shortDescription: 'Emergency mechanical thrombectomy to restore blood flow during acute ischemic stroke.' },
      'zh-TW': { title: '急性中風血管再通術', shortDescription: '緊急機械取栓術，在急性缺血性中風期間恢復腦部血流。' }
    },
    carotid_stenosis: {
      en: { title: 'Carotid Artery Stenting', shortDescription: 'Stent placement to open narrowed carotid arteries and prevent stroke.' },
      'zh-TW': { title: '頸動脈支架置入術', shortDescription: '置入支架打開狹窄的頸動脈，預防中風。' }
    },
    csdh: {
      en: { title: 'Chronic Subdural Hematoma Embolization', shortDescription: 'MMA embolization to treat and prevent recurrent chronic subdural hematoma.' },
      'zh-TW': { title: '慢性硬腦膜下血腫栓塞術', shortDescription: '腦膜中動脈栓塞術，治療及預防復發性慢性硬腦膜下血腫。' }
    },
    avm: {
      en: { title: 'Brain AVM & Dural Fistula Treatment', shortDescription: 'Endovascular embolization for arteriovenous malformations and dural arteriovenous fistulas.' },
      'zh-TW': { title: '腦部動靜脈畸形及硬腦膜瘻管治療', shortDescription: '血管內栓塞術治療動靜脈畸形及硬腦膜動靜脈瘻管。' }
    },
    dbs: {
      en: { title: 'Deep Brain Stimulation (DBS)', shortDescription: 'Neuromodulation therapy for Parkinson\'s disease, movement disorders, and psychiatric conditions.' },
      'zh-TW': { title: '深腦部刺激術 (DBS)', shortDescription: '針對柏金遜症、運動障礙及精神疾病的神經調節治療。' }
    },
    sleep_apnea: {
      en: { title: 'Hypoglossal Nerve Stimulation', shortDescription: 'Implantable device therapy for moderate-to-severe obstructive sleep apnea.' },
      'zh-TW': { title: '舌下神經刺激術', shortDescription: '針對中度至重度阻塞性睡眠窒息症的植入裝置治療。' }
    },
    uterine_fibroids: {
      en: { title: 'Uterine Fibroid Embolization', shortDescription: 'Non-surgical treatment for uterine fibroids causing heavy bleeding and pain.' },
      'zh-TW': { title: '子宮動脈栓塞術', shortDescription: '非手術治療子宮肌瘤，減少大量出血及疼痛。' }
    },
    prostate_enlargement: {
      en: { title: 'Prostate Artery Embolization', shortDescription: 'Minimally invasive treatment for enlarged prostate (BPH) urinary symptoms.' },
      'zh-TW': { title: '前列腺動脈栓塞術', shortDescription: '微創治療前列腺肥大（BPH）的泌尿症狀。' }
    },
    pelvic_congestion: {
      en: { title: 'Pelvic Congestion & Varicocele Embolization', shortDescription: 'Vein embolization for pelvic congestion syndrome and male varicocele.' },
      'zh-TW': { title: '盆腔充血及精索靜脈曲張栓塞術', shortDescription: '針對盆腔充血綜合症及男性精索靜脈曲張的靜脈栓塞術。' }
    },
    varicocele: {
      en: { title: 'Pelvic Congestion & Varicocele Embolization', shortDescription: 'Vein embolization for pelvic congestion syndrome and male varicocele.' },
      'zh-TW': { title: '盆腔充血及精索靜脈曲張栓塞術', shortDescription: '針對盆腔充血綜合症及男性精索靜脈曲張的靜脈栓塞術。' }
    },
    varicose_veins: {
      en: { title: 'Varicose Vein Treatment', shortDescription: 'Advanced minimally invasive options for varicose veins and chronic venous insufficiency.' },
      'zh-TW': { title: '靜脈曲張治療', shortDescription: '針對靜脈曲張及慢性靜脈功能不全的先進微創治療。' }
    },
    hemorrhoids: {
      en: { title: 'Hemorrhoidal Artery Embolization', shortDescription: 'Non-surgical treatment for symptomatic internal hemorrhoids.' },
      'zh-TW': { title: '痔瘡動脈栓塞術', shortDescription: '針對症狀性內痔的非手術治療。' }
    },
    knee_arthritis: {
      en: { title: 'Genicular Artery Embolization', shortDescription: 'Targeted embolization for knee osteoarthritis pain.' },
      'zh-TW': { title: '膝動脈栓塞術', shortDescription: '針對膝骨關節炎疼痛的靶向栓塞術。' }
    },
    plantar_fasciitis: {
      en: { title: 'Plantar Fasciitis Embolization', shortDescription: 'Minimally invasive treatment for chronic plantar fasciitis heel pain.' },
      'zh-TW': { title: '足底筋膜炎栓塞術', shortDescription: '針對慢性足底筋膜炎足跟疼痛的微創治療。' }
    },
    oncology_intervention: {
      en: { title: 'Oncology Interventions', shortDescription: 'Minimally invasive treatments for cancer including chemoembolization and ablation.' },
      'zh-TW': { title: '腫瘤介入治療', shortDescription: '針對癌症的微創治療，包括化療栓塞及消融術。' }
    },
    peripheral_vascular: {
      en: { title: 'Peripheral Vascular Revascularization', shortDescription: 'Angioplasty and stenting for peripheral artery disease and limb salvage.' },
      'zh-TW': { title: '周邊血管再通術', shortDescription: '針對周邊動脈疾病及肢體挽救的血管成形術及支架置入術。' }
    },
    aortic_disease: {
      en: { title: 'Visceral & Aortic Disease Treatment', shortDescription: 'Comprehensive treatment for aortic aneurysms and visceral vascular conditions.' },
      'zh-TW': { title: '內臟及主動脈疾病治療', shortDescription: '針對主動脈瘤及內臟血管疾病的全面治療。' }
    },
  };
  
  return conditions[conditionId]?.[lang] || { title: conditionId, shortDescription: '' };
}

// Get match score label
export function getMatchScoreLabel(score: 'high' | 'medium' | 'low', lang: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    high: { en: 'High Match', 'zh-TW': '高度吻合' },
    medium: { en: 'Possible Match', 'zh-TW': '可能吻合' },
    low: { en: 'May be related', 'zh-TW': '可能相關' },
  };
  return labels[score][lang];
}

// Disclaimer text
export function getDisclaimer(lang: Locale): string {
  return lang === 'zh-TW'
    ? '免責聲明：此工具僅供參考，不能替代專業醫療建議、診斷或治療。如有醫療緊急情況，請立即致電緊急服務或前往急症室。'
    : 'Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. For medical emergencies, please call emergency services or visit the ER immediately.';
}
