'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Check, MapPin, Phone, Clock, Award, GraduationCap, Stethoscope } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const procedures = [
  {
    id: 1,
    title: 'Endovascular Treatment of Cerebral Aneurysm',
    shortDesc: 'Minimally invasive brain aneurysm treatment',
    icon: '🧠',
    content: {
      overview: `A cerebral aneurysm is a balloon-like bulge in a brain blood vessel. The vessel wall at this point becomes thin and fragile, creating a sac that fills with blood.

The goal of treatment is to prevent rupture or, if rupture has occurred, prevent rebleeding. For unruptured aneurysms, treatment decisions weigh rupture risk against treatment risk, considering size, location, shape, growth over time, patient age, and overall health. For ruptured aneurysms, treatment is urgent because the risk of rebleeding is high and carries even worse outcomes than the initial hemorrhage.`,
      treatment: `Under general anesthesia, a small puncture is made in the groin or wrist artery. Using X-ray guidance, thin catheters are navigated through the arterial system to reach the aneurysm in the brain.

Coil Embolization: Uses tiny platinum coils to fill the aneurysm. These coils disrupt blood flow within the aneurysm, preventing blood flow into the aneurysm. Coil embolization works particularly well for aneurysms with narrow, well-defined necks that can contain the coils.

Flow Diverter Embolization: A flow diverter is a densely woven mesh stent placed inside the parent artery across the aneurysm neck. The tight mesh reduces blood flow entering the aneurysm while maintaining normal flow through the parent artery.

In some cases, combination approaches may be used.`,
      recovery: `For unruptured aneurysms treated endovascularly, hospital stays typically range from 1-3 days. For ruptured aneurysms, recovery depends on the severity of the initial hemorrhage and may require extended hospitalization and rehabilitation.

Follow-up imaging (usually MRA or angiography) is performed at intervals—commonly 6 months, 1 year, and periodically thereafter—to confirm the aneurysm remains sealed.`
    }
  },
  {
    id: 2,
    title: 'Carotid Artery Stenting',
    shortDesc: 'Minimally invasive neck artery treatment',
    icon: '🫀',
    content: {
      overview: `The carotid arteries are two major blood vessels in your neck that carry blood to your brain. Over time, fatty deposits called plaque can build up inside these arteries, causing them to narrow. This condition, known as carotid stenosis, reduces blood flow to the brain and increases the risk of stroke.

Carotid artery disease often develops silently. Some people experience transient ischemic attacks (TIAs). Symptoms may include sudden weakness or numbness on one side of the body, difficulty speaking or understanding speech, temporary vision loss in one eye, or dizziness and loss of balance.`,
      treatment: `The procedure is performed through a small puncture in the wrist or groin. There is no incision on your neck.

Carotid Stenting: Carotid stenting is a minimally invasive procedure that treats narrowed neck arteries. A metal mesh tube called a stent is placed to keep the artery open. The stent becomes a permanent part of your artery wall, supporting healthy blood flow to your brain.

Throughout the procedure, a protective filter device catches any debris, safeguarding your brain during treatment.`,
      recovery: `Most patients return home within one to two days after the procedure. Most patients are able to resume normal activities within about a week.

Follow-up care involves regular ultrasound examinations to monitor your stent and overall carotid health over time. These appointments help ensure lasting treatment success.`
    }
  },
  {
    id: 3,
    title: 'Chronic Subdural Hematoma Embolization',
    shortDesc: 'MMA embolization for brain hematoma',
    icon: '🎯',
    content: {
      overview: `A chronic subdural hematoma (cSDH) is a collection of blood that forms slowly between the brain and its protective covering. This condition is particularly common in older adults.

Symptoms may develop gradually and can include persistent headaches that worsen over time, confusion or memory difficulties, weakness on one side of the body, balance problems, drowsiness, and speech difficulties.

Traditional treatment involves surgically draining the blood. While effective, some patients experience recurrence. Middle Meningeal Artery (MMA) embolization is a newer approach designed to address the underlying cause and reduce this risk.`,
      treatment: `Through a small puncture in the wrist or groin, a thin catheter is navigated through the blood vessels to reach the middle meningeal artery. The entire process typically takes one to two hours.

Middle Meningeal Artery Embolization: The middle meningeal artery supplies the membranes covering the brain. By blocking selected branches of this artery using tiny particles or liquid embolic agents, the fragile vessels within the hematoma membranes no longer receive blood flow.

This blockage stops the leakage that feeds the hematoma, allowing it to shrink gradually over time and significantly reducing the chance of recurrence. Both sides may be treated during the same session if needed.`,
      recovery: `Hospital stays for MMA embolization are typically short, often ranging from 1-2 days.

Unlike surgical drainage, the blood is not removed immediately; instead, the body reabsorbs the hematoma over time. Consequently, symptom improvement may be gradual as the pressure on the brain decreases.

Follow-up imaging (usually CT scans) is performed at intervals to monitor the shrinkage of the hematoma and ensure it does not return.`,
      advantages: `Eliminates the need for open skull surgery or drilling burr holes, significantly reducing surgical risks and recovery time.

Offers a lower rate of hematoma recurrence compared to traditional surgical evacuation by directly cutting off the blood supply feeding the bleed.

Provides a viable treatment option for elderly patients or those on blood thinners who may be too high-risk for conventional neurosurgery.`
    }
  },
  {
    id: 4,
    title: 'Trans-Venous Embolization',
    shortDesc: 'Vein-based minimally invasive treatment',
    icon: '💉',
    content: {
      overview: `When veins become damaged or their valves fail, blood flows backward and pools instead of returning to the heart. This leads to pain, swelling, and congestion. This procedure corrects the issue by closing off the damaged veins, allowing blood to naturally reroute through healthy pathways.

Trans-venous embolization is a minimally invasive procedure designed to treat conditions caused by malfunctioning veins.`,
      treatment: `Through a small puncture in the skin (usually in the neck or groin), a specialist physician guides a thin catheter through the venous system to reach the problem area. Once in position, the malfunctioning vein is sealed using tiny coils, special glue, or other embolic agents.

This technique treats the problem from the inside out, restoring normal circulation without the need for open surgery.

Conditions Treated:
• Pelvic Congestion Syndrome (Women): This condition is a common cause of chronic pelvic pain, resulting from enlarged, congested veins in the pelvis.
• Ovarian Vein Embolization: This specific treatment closes the faulty ovarian veins that are causing the backflow.
• Varicocele (Men): A varicocele is an enlargement of veins within the scrotum, similar to varicose veins in the leg. It affects approximately 15% of men and is a leading cause of male infertility.
• Testicular Vein Embolization: This procedure closes the malfunctioning testicular veins to stop blood pooling.`,
      recovery: `Most patients are discharged on the same day as the procedure.

Mild back or flank pain is common for a few days as the treated veins close down, but this is typically manageable with over-the-counter medication.

Patients can usually return to work and light activities within 24 to 48 hours, though heavy lifting should be avoided for about a week.

Follow-up care may involve appointments to ensure symptoms have resolved and, for varicocele patients, to monitor improvements in fertility over several months.`,
      advantages: `The procedure is performed entirely through the blood vessels, meaning there are no surgical incisions in sensitive areas like the abdomen or scrotum.

It addresses the root cause of conditions that are frequently misdiagnosed or overlooked, offering relief after years of suffering.

It avoids the risks associated with general anesthesia and open surgical recovery.`
    }
  },
  {
    id: 5,
    title: 'Trans-Arterial Embolization',
    shortDesc: 'Arterial pathway minimally invasive treatment',
    icon: '🔬',
    content: {
      overview: `Trans-arterial embolization is a minimally invasive treatment that uses your body's own blood vessels as a pathway to treat various conditions. By blocking the blood supply to diseased or overactive tissues, symptoms improve, and healing can occur naturally.`,
      treatment: `A thin catheter is guided through a small puncture in the wrist or groin, navigating to the target area using advanced imaging. Once in position, embolization agents are delivered to block specific blood vessels feeding the problem area.

There is no large incision, and the procedure utilizes the body's blood vessels.

Conditions Treated:
• Hemorrhoids: Hemorrhoids are swollen blood vessels causing bleeding and pain. Embolization reduces blood flow to these tissues, causing them to shrink. This is beneficial for patients wishing to avoid surgical hemorrhoidectomy and its painful recovery.
• Enlarged Prostate (BPH): Benign prostatic hyperplasia causes urinary difficulties. Prostatic Artery Embolization (PAE) shrinks the prostate gradually, improving symptoms while preserving sexual function and avoiding surgical risks.
• Uterine Fibroids: Fibroids cause heavy bleeding and pain. Uterine Artery Embolization (UAE) blocks blood flow to fibroids, causing them to soften and shrink while preserving the healthy uterus.
• Knee Arthritis: Abnormal blood vessels contribute to chronic knee pain. Genicular Artery Embolization (GAE) reduces inflammation and pain signaling. It requires no incisions on the knee and is an alternative to joint replacement.
• Chronic Foot Pain: For conditions like plantar fasciitis, embolization targets abnormal vessels associated with chronic inflammation, offering relief when conservative treatments fail.`,
      recovery: `Most patients return home on the same day or within 24 hours after the procedure.

Most patients are able to resume normal activities within a few days to a week, which is significantly faster than traditional surgery.

Follow-up care involves monitoring symptom improvement and may include imaging examinations to track the reduction of the treated tissue over time.`,
      advantages: `Since the procedure is performed through a pinhole puncture, there is no surgical scarring and minimal trauma to the body.

This approach is particularly beneficial for patients who have not responded to conservative measures, those who are high-risk for traditional surgery, or those seeking to preserve organ function (such as the uterus or prostate).`
    }
  },
  {
    id: 6,
    title: 'Endovascular Aneurysm Repair (EVAR)',
    shortDesc: 'Abdominal aortic aneurysm treatment',
    icon: '🏥',
    content: {
      overview: `The aorta is the largest blood vessel in the body, carrying blood from the heart to the rest of the body. An abdominal aortic aneurysm (AAA) occurs when the wall of the aorta weakens and bulges outward like a balloon.

As the aneurysm enlarges, the wall becomes thinner. If left untreated, it carries a high risk of rupture, which can cause life-threatening internal bleeding.`,
      treatment: `Endovascular Aneurysm Repair (EVAR) is a minimally invasive alternative to traditional open surgery. Instead of making a large incision in the abdomen, the surgeon accesses the aorta through small punctures or small incisions in the groin (femoral arteries).

How the Endograft Works: An endograft is a specialized fabric tube supported by a metal mesh framework. It acts as a "new liner" for the artery. The device is compressed into a thin catheter and guided to the aneurysm site. Once deployed, the graft expands to seal tightly against the healthy artery walls above and below the bulge.

Blood then flows through the endograft rather than the weakened aneurysm sac. By relieving the pressure on the aneurysm wall, the risk of rupture is effectively eliminated.

The procedure is typically performed under general, regional, or even local anesthesia and usually takes 2 to 3 hours to complete.`,
      recovery: `Because no large abdominal muscles are cut, recovery is significantly faster than open surgery. Most patients are discharged within 1 to 3 days and can return to normal activities within a few weeks.

Regular follow-up is crucial. CT scans or ultrasounds are performed at specific intervals (e.g., 1 month, 6 months, and annually) to ensure the graft remains in the correct position and that no blood is leaking back into the aneurysm sac.`,
      advantages: `Avoids large abdominal incisions, resulting in less trauma to the body, less post-operative pain, and minimal scarring.

Offers a safer treatment option for elderly patients or those with other medical conditions (such as heart or lung disease) who may not be able to tolerate major open surgery.

Significantly shorter hospital stays and a quicker return to daily life compared to open surgical repair.`
    }
  },
];

const whyUsPoints = [
  { title: 'Our Specialists', description: 'Board-certified specialists with decades of experience in endovascular procedures' },
  { title: 'Modern Facilities', description: 'State-of-the-art equipment and comfortable recovery rooms' },
  { title: 'Personalized Care', description: 'Treatment plans tailored to your unique needs and condition' },
  { title: 'Fast Recovery', description: 'Minimally invasive techniques for shorter hospital stays' },
];

const faqs = [
  {
    question: 'What is endovascular treatment?',
    answer: 'Endovascular treatment is a minimally invasive procedure performed inside blood vessels using catheters and specialized instruments. Instead of open surgery, doctors access the treatment area through small punctures in the groin or wrist, resulting in faster recovery, less pain, and minimal scarring.'
  },
  {
    question: 'How long does recovery take?',
    answer: 'Recovery time varies by procedure, but most endovascular treatments allow patients to return home within 1-3 days. Many patients can resume normal activities within a week, which is significantly faster than traditional open surgery recovery periods.'
  },
  {
    question: 'Am I a candidate for endovascular treatment?',
    answer: 'Candidacy depends on various factors including your specific condition, overall health, and anatomy. Our specialists evaluate each patient individually to determine the most appropriate treatment approach. Schedule a consultation to discuss your specific case.'
  },
  {
    question: 'Is endovascular treatment safe?',
    answer: 'Endovascular procedures are generally considered safe with lower complication rates compared to open surgery. However, like any medical procedure, there are risks involved. Our experienced team will discuss all potential risks and benefits with you during your consultation.'
  },
  {
    question: 'Will my insurance cover the procedure?',
    answer: 'Most insurance plans cover endovascular procedures when medically necessary. We recommend contacting your insurance provider to confirm coverage details. Our administrative team can also assist with insurance verification and any questions about coverage.'
  },
  {
    question: 'What should I expect during the procedure?',
    answer: 'Most procedures are performed under general or local anesthesia. You will have a small puncture in your groin or wrist. Using X-ray guidance, the doctor navigates catheters to the treatment area. The procedure typically takes 1-3 hours, and you will be monitored in recovery before discharge.'
  },
];

const teamMembers = [
  {
    name: 'Dr. Oscar Wong',
    title: 'Consultant Neurosurgeon',
    specialty: 'Endovascular Specialist',
    experience: '20+ years experience',
    icon: Award,
    education: [
      'MD, Harvard Medical School',
      'Fellowship in Endovascular Surgery, Mayo Clinic',
      'Residency in General Surgery, Johns Hopkins Hospital',
      'Board Certified in Vascular Surgery'
    ],
    certifications: [
      'Fellow, Society for Vascular Surgery (SVS)',
      'Member, American College of Surgeons (ACS)',
      'Diplomate, American Board of Vascular Surgery',
      'Fellow, Society of Interventional Radiology (SIR)'
    ],
    expertise: [
      'Cerebral Aneurysm Treatment',
      'Carotid Artery Stenting',
      'Complex Aortic Repairs',
      'Peripheral Artery Disease'
    ],
    bio: 'Dr. Chen is a pioneer in minimally invasive vascular procedures with over 20 years of clinical experience. She has performed more than 5,000 endovascular procedures and has published extensively in peer-reviewed journals. Her research focuses on improving patient outcomes through innovative treatment approaches.'
  },
  {
    name: 'Dr. Titus Wong',
    title: 'Consultant Interventional Radiologist',
    specialty: 'Interventional Radiology',
    experience: '15+ years experience',
    icon: Stethoscope,
    education: [
      'MD, Stanford University School of Medicine',
      'Residency in Diagnostic Radiology, UCLA Medical Center',
      'Fellowship in Interventional Radiology, MD Anderson Cancer Center',
      'Board Certified in Diagnostic & Interventional Radiology'
    ],
    certifications: [
      'Fellow, Society of Interventional Radiology (SIR)',
      'Member, Radiological Society of North America (RSNA)',
      'Diplomate, American Board of Radiology',
      'Certified in Vascular & Interventional Radiology'
    ],
    expertise: [
      'Trans-Arterial Embolization',
      'Uterine Fibroid Embolization',
      'Prostate Artery Embolization',
      'Oncologic Interventions'
    ],
    bio: 'Dr. Rodriguez specializes in cutting-edge interventional radiology techniques. He trained at world-renowned institutions and brings expertise in treating complex vascular conditions with minimally invasive approaches. He is passionate about patient-centered care and optimizing recovery times.'
  },
  {
    name: 'Dr. Kwong-Yau Chan',
    title: 'Consultant Vascular Surgeon',
    specialty: 'Minimally Invasive Procedures',
    experience: '12+ years experience',
    icon: GraduationCap,
    education: [
      'MD, Johns Hopkins University School of Medicine',
      'Residency in General Surgery, Massachusetts General Hospital',
      'Fellowship in Vascular Surgery, Cleveland Clinic',
      'Board Certified in General & Vascular Surgery'
    ],
    certifications: [
      'Fellow, American College of Surgeons (ACS)',
      'Member, Society for Vascular Surgery (SVS)',
      'Diplomate, American Board of Surgery',
      'European Board of Vascular Surgery Certification'
    ],
    expertise: [
      'EVAR & TEVAR Procedures',
      'Venous Disease Treatment',
      'Dialysis Access Management',
      'Limb Salvage Surgery'
    ],
    bio: 'Dr. Watson is dedicated to providing the least invasive treatment options for her patients. With fellowship training at the Cleveland Clinic, she combines surgical expertise with advanced endovascular skills. She has been recognized for her compassionate patient care and clinical excellence.'
  },
  {
    name: 'Dr. Clinton Wong',
    title: 'Consultant Surgeon',
    specialty: 'Aneurysm Treatment',
    experience: '18+ years experience',
    icon: Award,
    education: [
      'MD, Mayo Clinic Alix School of Medicine',
      'PhD in Biomedical Engineering, MIT',
      'Residency in Neurosurgery, UCSF Medical Center',
      'Fellowship in Cerebrovascular Surgery, Barrow Neurological Institute'
    ],
    certifications: [
      'Fellow, American Association of Neurological Surgeons (AANS)',
      'Member, Congress of Neurological Surgeons (CNS)',
      'Diplomate, American Board of Neurological Surgery',
      'Society of Vascular & Interventional Neurology (SVIN)'
    ],
    expertise: [
      'Brain Aneurysm Coiling',
      'Flow Diverter Procedures',
      'Chronic Subdural Hematoma Treatment',
      'Cerebrovascular Disorders'
    ],
    bio: 'Dr. Park brings a unique combination of neurosurgical expertise and biomedical engineering background. His research-driven approach and precision in treating cerebrovascular conditions have made him a leader in the field. He has developed several techniques for complex aneurysm treatments.'
  },
];

export default function HomePage() {
  const [openDialogs, setOpenDialogs] = useState<Record<number, boolean>>({});
  const [openTeamDialogs, setOpenTeamDialogs] = useState<Record<number, boolean>>({});

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white text-black">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                Advanced Treatments for Brain, Spine and Body Conditions
              </h1>
              
              <p className="text-lg text-gray-600">
                
                Minimally invasive options for faster recovery and improved outcomes.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <a href="/bookings">My Bookings</a>
                </Button>
                <Button asChild variant="outline" className="border-black text-black hover:bg-gray-100">
                  <a href="#procedures">Our Procedures</a>
                </Button>
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src="/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg" 
                  alt="BEVA Clinic Medical Facility" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section id="procedures" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Procedures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Highly specialised treatments delivered by experienced specialists
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((procedure) => (
              <Dialog 
                key={procedure.id} 
                open={openDialogs[procedure.id]} 
                onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [procedure.id]: open }))}
              >
                <DialogTrigger asChild>
                  <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col group overflow-hidden">
                    <CardHeader className="flex-grow pb-2">
                      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{procedure.icon}</div>
                      <CardTitle className="text-black text-lg group-hover:text-gray-700 transition-colors">{procedure.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {procedure.shortDesc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 mt-auto">
                      <p className="text-center text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
                        Click to learn more
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{procedure.icon}</span>
                      <DialogTitle className="text-2xl">{procedure.title}</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-600">
                      {procedure.shortDesc}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h3 className="font-semibold text-black mb-2">Overview</h3>
                      <p className="text-gray-700 whitespace-pre-line">{procedure.content.overview}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-black mb-2">Treatment</h3>
                      <p className="text-gray-700 whitespace-pre-line">{procedure.content.treatment}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-black mb-2">Recovery & Follow-Up</h3>
                      <p className="text-gray-700 whitespace-pre-line">{procedure.content.recovery}</p>
                    </div>
                    
                    {procedure.content.advantages && (
                      <div>
                        <h3 className="font-semibold text-black mb-2">Advantages</h3>
                        <p className="text-gray-700 whitespace-pre-line">{procedure.content.advantages}</p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => {
                          setOpenDialogs(prev => ({ ...prev, [procedure.id]: false }));
                          setTimeout(scrollToContact, 100);
                        }}
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        Contact Us About This Procedure
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of patients for quality vascular care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              World-class specialists with extensive training and expertise in endovascular care
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((doctor, index) => {
              const IconComponent = doctor.icon;
              return (
                <Dialog 
                  key={index}
                  open={openTeamDialogs[index]} 
                  onOpenChange={(open) => setOpenTeamDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                      <CardHeader className="text-center pb-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                          <IconComponent className="w-10 h-10 text-gray-600" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-gray-700 transition-colors">{doctor.name}</CardTitle>
                        <CardDescription className="space-y-1">
                          <p className="font-medium text-black">{doctor.title}</p>
                          <p className="text-gray-500">{doctor.specialty}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <Award className="w-4 h-4" />
                          <span>{doctor.experience}</span>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-3 group-hover:text-gray-500 transition-colors">
                          Click to view profile
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-10 h-10 text-gray-600" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl mb-1">{doctor.name}</DialogTitle>
                          <DialogDescription className="text-base">
                            <span className="block font-medium text-black">{doctor.title}</span>
                            <span className="block text-gray-500">{doctor.specialty}</span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      {/* Education */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Education & Training
                        </h3>
                        <ul className="space-y-2">
                          {doctor.education.map((edu, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-black mt-1">•</span>
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Certifications */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          Certifications & Memberships
                        </h3>
                        <ul className="space-y-2">
                          {doctor.certifications.map((cert, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-black mt-1">•</span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Expertise */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <Stethoscope className="w-5 h-5" />
                          Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((exp, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bio */}
                      <div>
                        <h3 className="font-semibold text-black mb-3">About</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button 
                          onClick={() => {
                            setOpenTeamDialogs(prev => ({ ...prev, [index]: false }));
                            setTimeout(scrollToContact, 100);
                          }}
                          className="w-full bg-black text-white hover:bg-gray-800"
                        >
                          Book a Consultation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch to schedule a consultation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Suite 1904<br />
                    21 Ashley Road<br />
                    Tsim Sha Tsui, Kowloon
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">Phone: +852 91061836</p>
                  <p className="text-gray-600">Email: info@bevahk.com</p>
                </CardContent>
              </Card>
              
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p className="text-sm text-gray-500 mt-2">Emergency services available 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-full min-h-[400px]">
              <Card className="border-gray-200 h-full overflow-hidden">
                <CardContent className="p-0 h-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.49494256864!2d114.16780177693236!3d22.29711384300774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040121e78df1ad%3A0xb2b135950f821bc4!2s21%20Ashley!5e0!3m2!1sen!2shk!4v1770102531541!5m2!1sen!2shk" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="min-h-[400px] rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find answers to common questions about our procedures and services
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                <AccordionTrigger className="text-left font-medium text-black hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <img 
                src="/BEVA1 (White).svg" 
                alt="BEVA Clinic" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm">
                Providing exceptional care with compassion and expertise.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#procedures" className="hover:text-white transition-colors">Procedures</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/bookings" className="hover:text-white transition-colors">My Bookings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Procedures</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#procedures" className="hover:text-white transition-colors">Cerebral Aneurysm</a></li>
                <li><a href="#procedures" className="hover:text-white transition-colors">Carotid Stenting</a></li>
                <li><a href="#procedures" className="hover:text-white transition-colors">EVAR</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>123 Medical Center Drive</li>
                <li>Hong Kong, Central</li>
                <li>+852 1234 5678</li>
                <li>info@bevahk.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BEVA. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
