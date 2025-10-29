import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe2, Menu, X, Play } from 'lucide-react';
import Lenis from 'lenis';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activePage, setActivePage] = useState('about');
  const [activeSubsection, setActiveSubsection] = useState('');
  const [view, setView] = useState('main'); // 'main' or 'detail'
  const [selectedCar, setSelectedCar] = useState(null); // e.g. 'spyder'
  const [activeGallerySlide, setActiveGallerySlide] = useState(0);
  const [activeVisualizingIndex, setActiveVisualizingIndex] = useState(0);
  const [activeInteriorSlides, setActiveInteriorSlides] = useState([]);
  const [activeExteriorSlides, setActiveExteriorSlides] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const mainContentRef = useRef(null);
  const lenisRef = useRef(null);
  const subsectionNavRef = useRef(null);
  const VISUALIZING_SLIDESHOW_DURATION = 5000;

  const navigationItems = [
    { name: 'ABOUT', page: 'about', align: 'start' },
    { name: 'VISUALIZING', page: 'visualizing', align: 'center' },
    { name: 'CONTACT', page: 'contact', align: 'end' }
  ];

  const pageSubsections = {
    about: [
      { name: 'about me', href: '#about-me' },
      { name: 'gallery', href: '#gallery' },
      { name: 'videos', href: '#videos' }
    ],
    visualizing: [
      { name: 'RR-Bolshoi', href: '#rr-bolshoi' },
      { name: 'sv-hermes', href: '#sv-hermes' },
      { name: 'spyder', href: '#spyder' }
    ],
    contact: [
      { name: 'client form', href: '#client-form' }
    ]
  };

  const activePageIndex = navigationItems.findIndex(item => item.page === activePage);
  const pageIndicator = `0${activePageIndex + 1}//0${navigationItems.length}`;

  const carDetailSubsections = [
    { name: 'Intro', href: '#intro' },
    { name: 'Look', href: '#look' },
    { name: 'Interior', href: '#interior' },
    { name: 'Exterior', href: '#exterior' },
    { name: 'Wheels', href: '#wheels' },
  ];

  const visualizingContent = {
    spyder: {
      title: 'SPYDER',
      subtitle: 'Turquoise Spyder — Designed 12/09/2025',
      image: `${import.meta.env.BASE_URL}SPYDER/spyder_title.png`,
      introImage: `${import.meta.env.BASE_URL}SPYDER/spyder_details/1.png`,
      number: '00.05',
      titleClassName: 'text-9xl',
      detailNumber: '03/',
      detailTotal: '/03',
      interior: {
        title: 'Interior',
        page: '01/',
        subtitle: 'Interior',
        totalPages: '/03',
        description_title: 'SPYDER',
        description_text: 'С самого начала интерьер был ключевым элементом в дизайне автомобиля. Быстро стало ясно, что работа только с технической составляющей недостаточна. Каждый элемент — от руля и ремней безопасности до ковриков и декоративных вставок — должен был быть выполнен в едином стиле, чтобы создать целостный образ.',
        textPosition: 'above',
        sliders: [
          {
            images: [
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/2.1.png`,
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/2.2.png`
            ],
            text: 'Карбон как материя, тактильность как задача',
            left_title: 'SPYDER'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/3.1.png`,
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/3.2.png`
            ],
            text: 'Руль полностью перешит — добавлены элементы из кованого карбона и кожи, собранные в заводскую геометрию',
            left_title: 'SPYDER'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/4.1.png`,
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/4.2.png`
            ],
            text: 'Коврики выполнены в миксе карбона и кастомного рисунка под фирменную эстетику проекта, покрытый в защитную пленку',
            left_title: 'SPYDER'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/5.1.png`,
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/5.2.png`
            ],
            text: 'Панель приборов — пластик заменён на кованный карбон с точной подгонкой под заводской стандарт',
            left_title: 'SPYDER'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SPYDER/spyder_details/6.png`
            ],
            text: 'Ремни были подобраны в цвет кузова',
            left_title: 'SPYDER'
          }
        ]
      },
      exterior: {
        title: 'Exterior',
        page: '02/',
        subtitle: 'Exterior',
        totalPages: '/02',
        description_title: 'The Spyder',
        descriptions: [
          { text: 'Цвет кузова — первичен, золото — вторично', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/7.png` },
          { text: 'Установлено аккуратное вердугдо, окрашенное в цвет кузова для визуальной цельности.', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/8.png` },
          { text: 'Золотые вставки выстроены в тон дискам — создают связку дизайна через весь силуэт.', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/9.png` },
          { text: 'От спойлера до переднего логотипа проходит итальянский флаг на белом основании — строгая осевая линия, подчёркивающая динамику.', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/10.png` }
        ]
      },
      wheels: {
        title: 'Wheels',
        page: '04/',
        subtitle: 'Wheels',
        totalPages: '/02',
        description_title: 'Wheels',
        descriptions: [
          { text: 'Вдохновение Countach. \nДвухслойное золото.', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/11.png` },
          { text: 'Колёса выполнены по концепции дисков Lamborghini Countach LPI 800-4 — сложный двухслойный золотой оттенок, поданный как главный визуальный акцент проекта.', image: `${import.meta.env.BASE_URL}SPYDER/spyder_details/12.png` }
        ]
      },
      accessories: {
        title: 'Accessories',
        page: '01/',
        subtitle: 'Accessories',
        totalPages: '/02',
        description_title: '',
        description_text: `Being able to adapt to the car's original body colorways is one of our key strengths. Rather than completely altering the overall look, We focus on adding subtle details that complement and enhance the existing design.`
      }
    },
    'sv-hermes': {
      title: 'SV-HERMES',
      subtitle: 'SV-Hermes — Designed 10/15/2024',
      image: `${import.meta.env.BASE_URL}SV/SV_Title.png`,
      introImage: `${import.meta.env.BASE_URL}SV/SV_details/intro.png`,
      number: '00.06',
      titleClassName: 'text-8xl',
      detailNumber: '02/',
      detailTotal: ' /03',
      interior: {
        title: 'Interior',
        page: '01/',
        subtitle: 'Interior',
        totalPages: '/06',
        description_title: '',
        description_text: '',
        textPosition: 'above',
        sliders: [
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/3.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/4.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/4.2.png`
            ],
            text: 'Hermes pattern',
            left_title: 'Салон'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/5.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/3.2.png`
            ],
            text: 'Заменили оконтовку руля в белый гляне, задача была сделать фон под белую керамику на всех деталях (в интерьере уже были белые керамические элементы, ручка КПП).',
            left_title: 'Руль'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/6.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/6.2.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/6.3.png`
            ],
            text: 'Деревянные двухцветные в защитном лаке - в сочетании с  салоном - точечно вырезанный для всех посадочных мест индивидуально',
            left_title: 'Коврики'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/7.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/7.2.png`
            ],
            text: 'Эксклюзивный интерьер в стиле Hermes, паттерн. Лошадок сделали под серебро, чтобы они переливались, появлялись и исчезали в зависимости от освещения и угла зрения. Все под глянцевым лаком.',
            left_title: 'Hermes лошади'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/8.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/8.2.png`
            ],
            text: 'С полосками тоже было непросто — толщина полосок строго 0,8 мм, а сами детали были шпонированные, рельефные. Пришлось долго их готовить, шпаклевать, грунтовать, выравнивать, чтобы не было просадок и глянец сохранился надолго.',
            left_title: 'Hermes лошади'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}SV/SV_details/10.1.png`,
              `${import.meta.env.BASE_URL}SV/SV_details/10.2.png`
            ],
            text: 'Деревянный багажный коврик -выполненный в том же стиле, что и салонные коврики, с единственным отличием — металлическая наклейка с инициалами владельца',
            left_title: 'Багажник'
          }
        ]
      },
      exterior: {
        title: 'Exterior',
        page: '02/',
        subtitle: 'Exterior',
        totalPages: '/02',
        description_title: '',
        descriptions: [
          { text: 'Оригинальный цвет глянца затянут в матовый', image: `${import.meta.env.BASE_URL}SV/SV_details/1.png`, left_title: 'Кузов' },
          { text: 'Вверх обклеен белой глянцевой пленкой', image: `${import.meta.env.BASE_URL}SV/SV_details/2.png`, left_title: 'Кузов' }
        ]
      },
      accessories: {
        title: 'Accessories',
        page: '01/',
        subtitle: 'Accessories',
        totalPages: '/02',
        description_title: '',
        description_text: 'Placeholder text for SV-Hermes accessories description.'
      }
    },
    'rr-bolshoi': {
      title: 'RR-BOLSHOI',
      subtitle: 'RR-Bolshoi — Designed 08/21/2023',
      image: `${import.meta.env.BASE_URL}RR/RR_Title.png`,
      introImage: `${import.meta.env.BASE_URL}RR/RR_details/1.png`,
      number: '00.07',
      titleClassName: 'text-8xl',
      detailNumber: '01/',
      detailTotal: '/03',
      exterior: {
        title: 'Exterior',
        page: '01/',
        subtitle: 'Exterior',
        totalPages: '/03',
        descriptions: [
          {
            image: `${import.meta.env.BASE_URL}RR/RR_details/2.png`,
            text: "Кузов оформлен в светлом балансе металла и золота.\nКапот оклеен серебристой плёнкой с золотыми контрастными деталями",
            left_title: 'Кузов'
          },
          {
            image: `${import.meta.env.BASE_URL}RR/RR_details/4.png`,
            text: 'Диски выточенны и установлены идивидуаьно по макетам заказика',
            left_title: 'Диски'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/5.1.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/5.2.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/5.3.png`
            ],
            text: 'Багажник для крыши выполнен в виде полноценной палубной конструкции с полностью функционирующим механизмом складывания, заключённым в натуральный деревянный корпус',
            left_title: 'Багажник'
          }
        ]
      },
      interior: {
        title: 'Interior',
        page: '01/',
        subtitle: 'Interior',
        totalPages: '/05',
        description_title: '',
        description_text: '',
        textPosition: 'above',
        sliders: [
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/6.1.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/6.2.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/6.3.png`
            ],
            text: 'Решено было вдохновиться стилем Zenith и подчеркнуть индивидуальность автомобиля.',
            left_title: 'Салон'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/7.png`
            ],
            text: 'Применена оригинальная кожа, подобранная по текстуре и тактильным ощущениям. Передние сиденья перетянуты натуральной кожей с разработанной нами перфорацией.',
            left_title: 'Салон'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/8.1.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/8.2.png`
            ],
            text: 'Руль полностью перешит, дополнен деревянными вставками и отделкой из синей кожи',
            left_title: 'Руль'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/9.1.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/9.2.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/9.3.png`
            ],
            text: 'Тиковые Коврики выполнены из тикового дерева с кожаными вставками и защищены прозрачными полиуретановыми покрытиями',
            left_title: 'Коврики'
          },
          {
            images: [
              `${import.meta.env.BASE_URL}RR/RR_details/10.1.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/10.2.png`,
              `${import.meta.env.BASE_URL}RR/RR_details/10.3.png`
            ],
            text: 'Чехол выполнен из тикового дерева с кожаными вставками и защищены прозрачными полиуретановыми покрытиями',
            left_title: 'Чехол'
          }
        ]
      },
      accessories: {
        title: 'Accessories',
        page: '01/',
        subtitle: 'Accessories',
        totalPages: '/02',
        description_title: '',
        description_text: 'Placeholder text for RR-Bolshoi accessories description.'
      }
    },
  };

  const galleryItems = Object.values(visualizingContent).map(car => ({
    key: car.title.toLowerCase().replace(/ /g, '-'),
    title: car.title,
    subtitle: car.subtitle,
    image: car.image,
  }));

  useEffect(() => {
    if (activePage === 'about') {
        const timer = setTimeout(() => {
            setActiveGallerySlide(prev => (prev + 1) % galleryItems.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearTimeout(timer);
    }
  }, [activeGallerySlide, activePage, galleryItems.length]);

  useEffect(() => {
    if (activePage === 'visualizing' && view === 'main') {
      const timer = setTimeout(() => {
        setActiveVisualizingIndex(prev => (prev + 1) % pageSubsections.visualizing.length);
      }, VISUALIZING_SLIDESHOW_DURATION);
      return () => clearTimeout(timer);
    }
  }, [activeVisualizingIndex, activePage, view]);

  useEffect(() => {
    if (activePage === 'visualizing' && view === 'main') {
      setActiveSubsection(pageSubsections.visualizing[activeVisualizingIndex].href);
    }
  }, [activeVisualizingIndex, activePage, view]);

  useEffect(() => {
    if (selectedCar) {
      if (visualizingContent[selectedCar].interior.sliders) {
        setActiveInteriorSlides(new Array(visualizingContent[selectedCar].interior.sliders.length).fill(0));
      }
      if (visualizingContent[selectedCar].exterior?.descriptions) {
        setActiveExteriorSlides(new Array(visualizingContent[selectedCar].exterior.descriptions.length).fill(0));
      }
    }
  }, [selectedCar]);

  useEffect(() => {
    if (view === 'detail' && selectedCar && visualizingContent[selectedCar].interior.sliders) {
      const sliders = visualizingContent[selectedCar].interior.sliders;
      const timers = sliders.map((slider, sliderIndex) => {
        const numItems = slider.images?.length || slider.colors?.length || 0;
        if (numItems > 1) {
          return setInterval(() => {
            setActiveInteriorSlides(prevSlides => {
              const newSlides = [...prevSlides];
              newSlides[sliderIndex] = (newSlides[sliderIndex] + 1) % numItems;
              return newSlides;
            });
          }, 3000); // Change every 3 seconds
        }
        return null;
      });

      return () => {
        timers.forEach(timer => {
          if (timer) clearInterval(timer);
        });
      };
    }
  }, [view, selectedCar]);

  useEffect(() => {
    if (view === 'detail' && selectedCar && visualizingContent[selectedCar].exterior?.descriptions) {
      const descriptions = visualizingContent[selectedCar].exterior.descriptions;
      const timers = descriptions.map((item, itemIndex) => {
        const numItems = item.images?.length || 0;
        if (numItems > 1) {
          return setInterval(() => {
            setActiveExteriorSlides(prevSlides => {
              const newSlides = [...prevSlides];
              newSlides[itemIndex] = (newSlides[itemIndex] + 1) % numItems;
              return newSlides;
            });
          }, 3000); // Change every 3 seconds
        }
        return null;
      });

      return () => {
        timers.forEach(timer => {
          if (timer) clearInterval(timer);
        });
      };
    }
  }, [view, selectedCar]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '1') {
        setShowComingSoon(false);
      }
    };

    if (showComingSoon) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showComingSoon]);

  const handleCarSelect = (carKey) => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    setSelectedCar(carKey);
    setView('detail');
  };

  const currentSubsections =
    view === 'detail' && selectedCar
      ? carDetailSubsections.filter(subsection => {
          const sectionKey = subsection.href.substring(1);
          if (sectionKey === 'intro') {
            return true;
          }
          return Object.prototype.hasOwnProperty.call(visualizingContent[selectedCar], sectionKey);
        })
      : pageSubsections[activePage];

  useEffect(() => {
    if (subsectionNavRef.current) {
      const activeElement = subsectionNavRef.current.querySelector('.active-subsection');
      if (activeElement) {
        const navHeight = subsectionNavRef.current.offsetHeight;
        const itemHeight = activeElement.offsetHeight;
        const itemTop = activeElement.offsetTop;
        
        const scrollTop = itemTop - (navHeight / 2) + (itemHeight / 2);
        
        subsectionNavRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSubsection]);

  useEffect(() => {
    if (showComingSoon) return;
    // Set initial subsection
    const subsection = currentSubsections[0];
    setActiveSubsection(subsection ? subsection.href : '');

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      wrapper: mainContentRef.current,
      duration: 1.5,
      easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // A gentler ease-out
    });
    lenisRef.current = lenis;

    const handleScroll = (e) => {
      if (!mainContentRef.current) return;

      const { scrollHeight, clientHeight } = mainContentRef.current;
      const scrollTop = e.scroll;

      // Icon rotation logic
      const rotationValue = -(scrollTop / 10);
      setRotation(rotationValue);

      // Subsection selection logic
      const scrollBottom = scrollTop + clientHeight;

      // Check if scrolled to the very bottom
      if (scrollBottom >= scrollHeight - 5) { // 5px threshold
        const lastSubsection = currentSubsections[currentSubsections.length - 1];
        if (lastSubsection) {
          setActiveSubsection(lastSubsection.href);
        }
        return;
      }

      let currentSubsection = '';
      const threshold = window.innerHeight / 3;

      if (activePage !== 'visualizing' || view === 'detail') {
        for (const subsection of currentSubsections) {
          const element = document.querySelector(subsection.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= threshold) {
              currentSubsection = subsection.href;
            }
          }
        }
      }

      if (currentSubsection) {
        setActiveSubsection(currentSubsection);
      } else if (currentSubsections.length > 0) {
        setActiveSubsection(currentSubsections[0].href);
      }
    };
    
    lenis.on('scroll', handleScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Initial check
    if (mainContentRef.current) {
        handleScroll({ scroll: mainContentRef.current.scrollTop });
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [activePage, view, selectedCar, showComingSoon]);

  const renderCarDetailPage = () => {
    if (!selectedCar) return null;
    const carData = visualizingContent[selectedCar];

    return (
      <section id="car-detail">
        <div id="intro" className="h-screen bg-black text-white flex flex-col p-8 relative">
          <div 
            className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')" }}
          />
          <div className="w-full flex flex-col h-full z-10 flex-grow">
            <header className="w-full flex justify-end pt-16 flex-shrink-0">
              <div className="w-full max-w-4xl">
                <h1 className="text-9xl font-bold tracking-tighter text-left">{carData.title}</h1>
                <div className="border-b border-white my-4"></div>
                <div className="flex justify-between items-center text-lg text-gray-300">
                  <span>{carData.detailNumber}</span>
                  <span className="text-white">{carData.subtitle}</span>
                  <span>{carData.detailTotal}</span>
                </div>
              </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-8 min-h-0">
              <div className="w-full h-full max-w-6xl max-h-[119vh] rounded-3xl overflow-hidden">
                {carData.introImage ? (
                  <img src={carData.introImage} alt={`${carData.title} intro`} className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-white w-full h-full">
                    {/* Image placeholder */}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        {carData.look && (
          <div id="look" className="min-h-screen bg-black text-white p-8">
            <div className="container mx-auto">
              <header className="py-8">
                <h1 className="text-8xl font-bold tracking-tighter">{carData.look.title}</h1>
                <div className="border-b border-white mt-4"></div>
                <div className="flex justify-between items-center text-lg mt-2 text-gray-400">
                  <span>{carData.look.page}</span>
                  <span className='text-white'>{carData.look.subtitle}</span>
                  <span>{carData.look.totalPages}</span>
                </div>
              </header>
              <main className="py-16 space-y-24">
                <div className="grid grid-cols-4 gap-8 items-start">
                  <div className="col-span-1">
                    <h3 className="text-2xl font-semibold">{carData.look.description1_title}</h3>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {carData.look.description1_text}
                    </p>
                  </div>
                </div>
                <div className="bg-white w-full max-w-6xl mx-auto h-[60vh] rounded-3xl">
                  {/* Image placeholder */}
                </div>
                <div className="grid grid-cols-4 gap-8 items-start">
                  <div className="col-span-1">
                    <h3 className="text-2xl font-semibold">{carData.look.description2_title}</h3>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {carData.look.description2_text}
                    </p>
                  </div>
                </div>
                <div className="bg-white w-full max-w-6xl mx-auto h-[60vh] rounded-3xl">
                  {/* Image placeholder */}
                </div>
                <div className="grid grid-cols-4 gap-8 items-start">
                  <div className="col-span-1">
                    <h3 className="text-2xl font-semibold">{carData.look.description3_title}</h3>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {carData.look.description3_text}
                    </p>
                  </div>
                </div>
                <div className="bg-white w-full max-w-6xl mx-auto h-[60vh] rounded-3xl">
                  {/* Image placeholder */}
                </div>
              </main>
            </div>
          </div>
        )}
        {carData.interior && <div id="interior" className="min-h-screen bg-black text-white p-8">
          <div className="container mx-auto">
            <header className="py-8">
              <h1 className="text-8xl font-bold tracking-tighter">{carData.interior.title}</h1>
              <div className="border-b border-white mt-4"></div>
              <div className="flex justify-between items-center text-lg mt-2 text-gray-400">
                <span>{carData.interior.page}</span>
                <span className='text-white'>{carData.interior.subtitle}</span>
                <span>{carData.interior.totalPages}</span>
              </div>
            </header>
            <main className="py-16 space-y-24">
              <div className="grid grid-cols-4 gap-8 items-start">
                <div className="col-span-1">
                  <h3 className="text-2xl font-semibold">{carData.interior.description_title}</h3>
                </div>
                <div className="col-span-3">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {carData.interior.description_text}
                  </p>
                </div>
              </div>
              
              {carData.interior.sliders?.map((slider, sliderIndex) => (
                <div key={sliderIndex} className="space-y-8">
                  {carData.interior.textPosition === 'above' ? (
                    slider.left_title ? (
                      <div className="grid grid-cols-4 gap-8 items-start pb-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-semibold">{slider.left_title}</h3>
                        </div>
                        <div className="col-span-3">
                          <p className={`text-xl text-gray-300 leading-relaxed ${ slider.textAlign === 'right' ? 'text-right' : '' }`}>
                            {slider.text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg text-gray-300 text-center pb-8">{slider.text}</p>
                    )
                  ) : null}

                  <div className="relative w-full max-w-6xl mx-auto h-[60vh] rounded-3xl overflow-hidden">
                    {slider.images ? (
                      slider.images.map((imageSrc, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={imageSrc}
                          alt={`${slider.text} ${imageIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                            activeInteriorSlides[sliderIndex] === imageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))
                    ) : (
                      slider.colors.map((colorClass, colorIndex) => (
                        <div
                          key={colorIndex}
                          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${colorClass} ${
                            activeInteriorSlides[sliderIndex] === colorIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                      {(slider.images?.length > 1 || slider.colors?.length > 1) && (slider.images || slider.colors).map((_, itemIndex) => (
                        <button 
                          key={itemIndex}
                          onClick={() => {
                            const newSlides = [...activeInteriorSlides];
                            newSlides[sliderIndex] = itemIndex;
                            setActiveInteriorSlides(newSlides);
                          }} 
                          className={`w-3 h-3 rounded-full transition-colors ${activeInteriorSlides[sliderIndex] === itemIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {!carData.interior.textPosition || carData.interior.textPosition !== 'above' ? (
                    slider.left_title ? (
                      <div className="grid grid-cols-4 gap-8 items-start pt-8">
                        <div className="col-span-1">
                          <h3 className="text-2xl font-semibold">{slider.left_title}</h3>
                        </div>
                        <div className="col-span-3">
                          <p className={`text-xl text-gray-300 leading-relaxed ${ slider.textAlign === 'right' ? 'text-right' : '' }`}>
                            {slider.text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg text-gray-300 text-center">{slider.text}</p>
                    )
                  ) : null}
                </div>
              ))}
            </main>
          </div>
        </div>}
        {carData.exterior && <div id="exterior" className="min-h-screen bg-black text-white p-8">
          <div className="container mx-auto">
            <header className="py-8">
              <h1 className="text-8xl font-bold tracking-tighter">{carData.exterior.title}</h1>
              <div className="border-b border-white mt-4"></div>
              <div className="flex justify-between items-center text-lg mt-2 text-gray-400">
                <span>{carData.exterior.page}</span>
                <span className='text-white'>{carData.exterior.subtitle}</span>
                <span>{carData.exterior.totalPages}</span>
              </div>
            </header>
            <main className="py-16 space-y-24">
              {(carData.exterior.descriptions || (carData.exterior.description_text ? [carData.exterior.description_text] : [])).map((item, index) => {
                const text = typeof item === 'string' ? item : item.text;
                const image = typeof item === 'string' ? null : item.image;
                const images = typeof item === 'object' ? item.images : null;

                return (
                  <React.Fragment key={index}>
                    <div className="grid grid-cols-4 gap-8 items-start">
                      <div className="col-span-1">
                        <h3 className="text-2xl font-semibold">{typeof item === 'object' && item.left_title ? item.left_title : carData.exterior.description_title}</h3>
                      </div>
                      <div className="col-span-3">
                        <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                          {text}
                        </p>
                      </div>
                    </div>
                    <div className="w-full max-w-6xl mx-auto h-[60vh] rounded-3xl overflow-hidden relative">
                      {images ? (
                        <>
                          {images.map((imageSrc, imageIndex) => (
                            <img
                              key={imageIndex}
                              src={imageSrc}
                              alt={`${text} ${imageIndex + 1}`}
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                                activeExteriorSlides[index] === imageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                            {images.length > 1 && images.map((_, itemIndex) => (
                              <button
                                key={itemIndex}
                                onClick={() => {
                                  const newSlides = [...activeExteriorSlides];
                                  newSlides[index] = itemIndex;
                                  setActiveExteriorSlides(newSlides);
                                }}
                                className={`w-3 h-3 rounded-full transition-colors ${activeExteriorSlides[index] === itemIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                              />
                            ))}
                          </div>
                        </>
                      ) : image ? (
                        <img src={image} alt={`Exterior detail ${index + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="bg-white w-full h-full">
                          {/* Image placeholder */}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </main>
                </div>
                </div>}
        {carData.wheels && <div id="wheels" className="min-h-screen bg-black text-white p-8">
          <div className="container mx-auto">
            <header className="py-8">
              <h1 className="text-8xl font-bold tracking-tighter">{carData.wheels.title}</h1>
              <div className="border-b border-white mt-4"></div>
              <div className="flex justify-between items-center text-lg mt-2 text-gray-400">
                <span>{carData.wheels.page}</span>
                <span className='text-white'>{carData.wheels.subtitle}</span>
                <span>{carData.wheels.totalPages}</span>
              </div>
            </header>
            <main className="py-16 space-y-24">
              {(carData.wheels.descriptions).map((item, index) => {
                const text = typeof item === 'string' ? item : item.text;
                const image = typeof item === 'string' ? null : item.image;

                return (
                  <React.Fragment key={index}>
                    <div className="grid grid-cols-4 gap-8 items-start">
                      <div className="col-span-1">
                            <h3 className="text-2xl font-semibold">{carData.wheels.description_title}</h3>
                      </div>
                      <div className="col-span-3">
                            <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                              {text}
                        </p>
                      </div>
                    </div>
                    <div className="w-full max-w-6xl mx-auto h-[60vh] rounded-3xl overflow-hidden">
                      {image ? (
                        <img src={image} alt={`Wheels detail ${index + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="bg-white w-full h-full">
                          {/* Image placeholder */}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </main>
          </div>
        </div>}
      </section>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case 'about':
        const currentSubsectionInfo = currentSubsections.find(item => item.href === activeSubsection);
        return (
          <>
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
              <img
                src={`${import.meta.env.BASE_URL}background.png`}
                alt="Backstage background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 w-full h-full bg-black/75" />
              <div 
                className="absolute inset-0 w-full h-full opacity-20"
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')" }}
              />
            </div>
            <section id="about" className="relative z-10">
              {/* "about me" subsection */}
              <div id="about-me">
                <header className="bg-transparent text-white h-screen flex flex-col relative">
                  
                  <div className="container mx-auto px-6 flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold">
                        INFAMOUS<br className="md:hidden" /> CUSTOMS
                      </h1>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="lg:hidden absolute bottom-0 left-0 right-0 w-full px-6 py-4 pointer-events-none">
                    <a href={currentSubsectionInfo?.href || '#about-me'} className="text-lg text-transparent">{currentSubsectionInfo?.name || 'about me'}</a>
                    <div className="border-b border-transparent w-full mt-1"></div>
                    <div className="flex justify-center w-full mt-4 opacity-0">
                        <img 
                          src={`${import.meta.env.BASE_URL}scroll.svg`} 
                          alt="Infamous Customs Logo" 
                          className="w-12 h-12"
                          style={{ transform: `rotate(${rotation}deg)` }}
                        />
                    </div>
                  </div>
                </header>
              </div>
              <div className="md:hidden bg-transparent text-white py-20 px-6">
                <div className="max-w-md mx-auto text-left text-sm space-y-4">
                  <p>
                    Мы — INFAMOUS CUSTOMS, первая компания в СНГ, специализирующаяся на модификации и кастомизации автомобилей класса люкс.
                  </p>
                  <div className="border-b border-white/50"></div>
                  <p>
                    Наш послужной список мастерских насчитывает более 30 организаций с проверенный 20 летним отточенным опытом. Наша задача предотвратить вас от ложных и завышенных цен от мастерских которые на вас наживаются. Короче говоря "у наших партнеров дешевле" и мы не только предоставляем но и знакомим с мастерскими в случае заинтересованности. С нашими готовыми представленными машинами сможем вас ознакомить лично чтобы вы убидились в качестве.
                  </p>
                  <div className="border-b border-white/50"></div>
                  <p>
                    [p.s ваш бюджет который вы предоставляете служит вашей же гарантией на все установленные дивайсы включающие технику].
                  </p>
                </div>
              </div>
              {/* "gallery" subsection */}
              <section id="gallery" className="h-screen bg-transparent text-white flex flex-col items-center justify-center relative overflow-hidden">
                {/* Desktop Version */}
                <div className="hidden lg:flex flex-col items-center justify-center">
                  <div className="text-center z-30 mb-8">
                      <h2 className="text-7xl font-bold tracking-tighter text-white leading-none">
                          {galleryItems[activeGallerySlide]?.title}
                      </h2>
                      <p className="text-lg mt-2">{galleryItems[activeGallerySlide]?.subtitle}</p>
                  </div>
                  <div className="w-full h-[60vh] relative flex items-center justify-center">
                      <div className="absolute w-[45vh] h-[45vh]">
                          {galleryItems.map((item, index) => {
                              const isActive = index === activeGallerySlide;
                              const isPrev = index === (activeGallerySlide - 1 + galleryItems.length) % galleryItems.length;
                              const isNext = index === (activeGallerySlide + 1) % galleryItems.length;
                              
                              let classes = 'absolute inset-0 transition-all duration-700 ease-in-out ';
                              let styles = {};
  
                              if (isActive) {
                                  classes += 'opacity-100 z-20';
                                  styles.transform = 'translateX(0) scale(1)';
                                  styles.filter = 'grayscale(0%) drop-shadow(0 8px 12px rgba(0,0,0,0.4))';
                              } else if (isPrev) {
                                  classes += 'opacity-75 z-10';
                                  styles.transform = 'translateX(-80%) scale(0.8)';
                                  styles.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.4)) saturate(0.5)';
                              } else if (isNext) {
                                  classes += 'opacity-75 z-10';
                                  styles.transform = 'translateX(80%) scale(0.8)';
                                  styles.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.4)) saturate(0.5)';
                              } else {
                                  classes += 'opacity-0 z-0';
                                  styles.transform = 'scale(0.7)';
                              }
  
                              return (
                                  <div key={item.key} className={classes} style={styles}>
                                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-3xl" />
                                  </div>
                              );
                          })}
                      </div>
                  </div>
                  <div className="text-center z-30 mt-8">
                      <button 
                          className="border border-white rounded-full px-6 py-2 text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition-colors"
                          onClick={() => handleCarSelect(galleryItems[activeGallerySlide]?.key)}
                      >
                          learn more
                      </button>
                      <div className="flex justify-center items-end space-x-4 mt-6">
                          {galleryItems.map((_, index) => {
                              const isActive = index === activeGallerySlide;
                              return (
                                  <div
                                      key={index}
                                      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'bg-gray-700' : 'bg-gray-600'}`}
                                      style={{
                                          height: isActive ? '2.5rem' : '1.5rem',
                                          width: '3px',
                                      }}
                                  >
                                      {isActive && (
                                          <div
                                              key={activeGallerySlide}
                                              className="absolute bottom-0 left-0 w-full bg-white"
                                              style={{ animation: 'fill-up 3s linear' }}
                                          />
                                      )}
                                  </div>
                              );
                          })}
                      </div>
                  </div>
                </div>

                {/* Mobile Version */}
                <div className="lg:hidden flex flex-col items-center justify-between w-full h-full pt-20 pb-28">
                  <div className="flex justify-center items-end space-x-2 mb-4">
                    {galleryItems.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 rounded-full transition-all duration-500 ${index === activeGallerySlide ? 'h-8 bg-white' : 'h-4 bg-gray-600'}`}
                      />
                    ))}
                  </div>

                  <div className="w-full h-[65vh] relative flex items-center justify-center">
                    <div className="absolute w-full h-full">
                      {galleryItems.map((item, index) => {
                        const isActive = index === activeGallerySlide;
                        const isPrev = index === (activeGallerySlide - 1 + galleryItems.length) % galleryItems.length;
                        const isNext = index === (activeGallerySlide + 1) % galleryItems.length;

                        let classes = 'absolute inset-0 transition-all duration-700 ease-in-out flex justify-center items-center ';
                        let styles = {};

                        if (isActive) {
                          classes += 'opacity-100 z-20';
                          styles.transform = 'translateX(0) scale(1)';
                        } else if (isPrev) {
                          classes += 'opacity-0 z-10';
                          styles.transform = 'translateX(-100%) scale(0.8)';
                        } else if (isNext) {
                          classes += 'opacity-0 z-10';
                          styles.transform = 'translateX(100%) scale(0.8)';
                        } else {
                          classes += 'opacity-0 z-0';
                          styles.transform = 'scale(0.7)';
                        }

                        return (
                          <div key={item.key} className={classes} style={styles}>
                            <div className="w-9/12 h-full">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-3xl" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center z-30 mt-4">
                    <h2 className="text-5xl font-bold tracking-tighter text-white leading-none">
                      {galleryItems[activeGallerySlide]?.title}
                    </h2>
                    <p className="text-md mt-2 text-gray-300">{galleryItems[activeGallerySlide]?.subtitle}</p>
                    <button
                      className="border border-white rounded-full px-6 py-2 text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition-colors mt-4"
                      onClick={() => handleCarSelect(galleryItems[activeGallerySlide]?.key)}
                    >
                      learn more
                    </button>
                  </div>
                </div>
              </section>
              {/* "videos" subsection */}
              <section id="videos" className="h-screen bg-transparent text-white">
                {/* Desktop */}
                <div className="hidden lg:flex h-full flex-col items-center justify-center p-8">
                  <div className="w-full max-w-5xl mx-auto text-center">
                    <p className="text-sm tracking-[0.3em] uppercase mb-4">INFAMOUS CUSTOMS backstage</p>
                    <h2 className="text-7xl md:text-8xl font-bold mb-12">COMING SOON</h2>
                    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl aspect-video w-full relative flex items-center justify-center p-6">
                      <button className="text-white">
                        <Play className="w-16 h-16 fill-white" />
                      </button>
                      <div className="absolute bottom-6 left-6 right-6 flex items-center space-x-4">
                        <span className="text-sm font-mono">00:00</span>
                        <div className="flex-grow bg-white/20 h-1 rounded-full relative">
                          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" style={{ left: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-end space-x-4 mt-12">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} 
                          className={`transition-all duration-500 ease-in-out ${index === 4 ? 'bg-white' : 'bg-gray-600'}`}
                          style={{
                            height: index === 4 ? '2.5rem' : '1.5rem',
                            width: '3px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Mobile */}
                <div className="lg:hidden h-full flex flex-col justify-center items-center text-center p-6 space-y-10">
                  <div className="flex justify-center items-end space-x-4">
                    <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="w-full max-w-sm">
                      <div className="bg-black rounded-3xl aspect-video w-full relative flex items-center justify-center">
                          <button className="text-white absolute">
                            <Play className="w-12 h-12 fill-white" />
                          </button>
                          <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2">
                            <span className="text-xs font-mono">00:00</span>
                            <div className="flex-grow bg-white/20 h-0.5 rounded-full relative">
                              <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" style={{ left: '10%' }}></div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="w-full max-w-sm">
                      <h2 className="text-5xl font-bold leading-none">HALOWEEN<br/>PARTY</h2>
                      <p className="mt-4 text-lg tracking-wider">INFAMOUS CUSTOMS X GREATS</p>
                  </div>
                </div>
              </section>
            </section>
            {/* Mobile Footer */}
            <div className="fixed bottom-0 left-0 right-0 w-full lg:hidden z-30 text-white bg-black/20 backdrop-blur-md">
              <div
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')" }}
              />
              <div className="relative px-6 py-4">
                <a href={currentSubsectionInfo?.href || '#about-me'} className="text-lg">{currentSubsectionInfo?.name || 'about me'}</a>
                <div className="border-b border-white w-full mt-1"></div>
                <div className="flex justify-center w-full mt-4">
                    <img
                      src={`${import.meta.env.BASE_URL}scroll.svg`}
                      alt="Infamous Customs Logo"
                      className="w-12 h-12"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>
              </div>
            </div>
          </>
        );
      case 'visualizing':
        const activeContentKey = activeSubsection.substring(1) as keyof typeof visualizingContent;
        
        const possibleKeys = Object.keys(visualizingContent);
        let activeContentKeyForRender = activeContentKey;
        if (!possibleKeys.includes(activeContentKeyForRender)) {
            activeContentKeyForRender = 'spyder';
        }
        const activeContent = visualizingContent[activeContentKeyForRender];

        return (
          <section id="visualizing" className="bg-black text-white h-screen flex flex-col">
            {/* Fading Background Images & Noise */}
            <div className="fixed inset-0 w-full h-full">
              {Object.entries(visualizingContent).map(([key, content]) => (
                <img 
                  key={key} 
                  src={content.image} 
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeSubsection === `#${key}` ? 'opacity-20' : 'opacity-0'} blur-sm grayscale`}
                />
              ))}
              <div 
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')" }}
              />
            </div>

            {/* Main Content */}
            <div className="h-full w-full flex items-stretch py-8 z-10">
              
              {/* Left Column: Number and Line */}
              <div className="w-[12.5%] flex-shrink-0 flex flex-col items-center justify-start pt-64 pointer-events-auto">
                <div className="w-full text-center pb-1 border-b border-white">
                    <span className="text-lg">{activeContent.number}</span>
                </div>
              </div>

              {/* Center Column: Photo and Content */}
              <div className="w-3/4 flex-shrink-0 h-full flex flex-col items-center justify-center relative">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full flex-grow relative">
                        {Object.entries(visualizingContent).map(([key, content]) => (
                            <div 
                                key={key} 
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out cursor-pointer ${activeSubsection === `#${key}` ? 'opacity-100' : 'opacity-0'}`}
                                onClick={() => handleCarSelect(key)}
                            >
                                <figure className="relative max-w-full max-h-full">
                                    <img 
                                        src={content.image}
                                        alt={content.title} 
                                        className="block max-w-full max-h-full object-contain rounded-3xl" 
                                    />
                                    <figcaption className="absolute bottom-8 left-8 pointer-events-none">
                                        <h2 className={`${content.titleClassName} font-bold tracking-tighter text-white leading-none`}>
                                            {content.title}
                                        </h2>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Subtitle and Button Below */}
                <div className="absolute bottom-24 inset-x-0 text-center pointer-events-auto">
                    <p className="text-lg">{activeContent.subtitle}</p>
                    <button 
                      onClick={() => handleCarSelect(activeContentKeyForRender)}
                      className="mt-4 border border-white rounded-full px-6 py-2 text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition-colors"
                    >
                        LEARN MORE
                    </button>
                </div>
              </div>

              {/* Right Column: Selector */}
              <div className="w-[12.5%] flex-shrink-0 flex items-center justify-center pointer-events-auto">
                <div className="flex flex-col space-y-4">
                  {pageSubsections.visualizing.map((item, index) => {
                      const isActive = index === activeVisualizingIndex;
                      return (
                          <button
                              key={item.href}
                              onClick={() => setActiveVisualizingIndex(index)}
                              className={`relative h-1 rounded-full overflow-hidden transition-all duration-500 ease-in-out ${
                                  isActive
                                      ? 'w-16 bg-gray-700'
                                      : 'w-10 bg-gray-600 hover:bg-gray-400'
                              }`}
                          >
                              {isActive && (
                                  <div
                                      key={activeVisualizingIndex}
                                      className="absolute top-0 left-0 h-full bg-white"
                                      style={{ animation: `fill-up-width ${VISUALIZING_SLIDESHOW_DURATION}ms linear` }}
                                  />
                              )}
                          </button>
                      )
                  })}
                </div>
              </div>

            </div>
          </section>
        );
      case 'contact':
        return (
          <section id="contact">
            <div id="client-form" className="h-screen bg-black text-white flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">Client Form</h2>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  if (showComingSoon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative">
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <img
            src={`${import.meta.env.BASE_URL}background.png`}
            alt="Coming soon background"
            className="w-full h-full object-cover blur-sm"
          />
          <div 
            className="absolute inset-0 w-full h-full opacity-20"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')" }}
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white">Coming Soon</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar for Desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 h-screen w-80 text-white hidden lg:flex ${activePage === 'about' ? '' : 'bg-black/20 backdrop-blur-md'}`}>
        <div className="flex h-full w-full">
          {/* Left Column */}
          <div className="w-28 h-full border-r border-white flex flex-col justify-center relative">
            <nav>
                <div className="space-y-24 flex flex-col">
                    {navigationItems.map((item) => (
                        <button key={item.name} onClick={() => {
                          setActivePage(item.page);
                          setView('main');
                          setSelectedCar(null);
                          if (item.page === 'visualizing') {
                            setActiveVisualizingIndex(0);
                          }
                        }} className={`self-${item.align} block text-xl font-medium text-white hover:text-gray-300 transition-colors duration-200 transform -rotate-90 bg-transparent border-none`}>
                            {item.name.toLowerCase()}
                        </button>
                    ))}
                </div>
            </nav>
          </div>

          {/* Middle Column */}
          <div className="w-20 h-full border-r border-white relative">
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -rotate-90 whitespace-nowrap">
                  <span className="text-sm tracking-[0.3em]">INFAMOUS CUSTOMS</span>
              </div>
              
              <div className="absolute top-1/2 left-1/2 w-12 h-12 text-white" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}>
                  <img src={`${import.meta.env.BASE_URL}scroll.svg`} alt="Infamous Customs Logo" />
              </div>
          </div>

          {/* Rightmost Column */}
          <div className="flex-1 h-full border-r border-white flex flex-col items-center justify-center text-center relative py-24">
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-24 text-white">
                <img src={`${import.meta.env.BASE_URL}Loggo.svg`} alt="Infamous Customs Logo" />
            </div>
            <div ref={subsectionNavRef} className="space-y-6 overflow-y-auto scrollbar-hide py-12" style={{ maxHeight: 'calc(100% - 12rem)'}}>
              {currentSubsections.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      lenisRef.current?.scrollTo(element, { 
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                      });
                    }
                  }}
                  className={`block transition-all duration-300 pb-1 border-b-2 ${
                    item.href === activeSubsection 
                      ? 'active-subsection text-lg font-semibold text-white border-white' 
                      : 'text-md text-gray-400 hover:text-white border-transparent'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile Burger Menu */}
      <button 
        onClick={() => setSidebarOpen(true)} 
        className="lg:hidden fixed top-4 right-6 z-30 text-white"
      >
        <Menu className="h-8 w-8" />
      </button>

      {/* Mobile Nav Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black z-50 text-white flex flex-col lg:hidden">
          <header className="relative flex justify-end items-center p-6 h-28">
            <div className="absolute left-1/2 -translate-x-1/2 top-8">
                <img src={`${import.meta.env.BASE_URL}Loggo.svg`} alt="Infamous Customs Logo" className="w-20"/>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
                <X className="h-8 w-8" />
            </button>
          </header>

          <nav className="flex-grow flex flex-col items-center justify-center space-y-6">
            {navigationItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => {
                  setActivePage(item.page);
                  setView('main');
                  setSelectedCar(null);
                  if (item.page === 'visualizing') {
                    setActiveVisualizingIndex(0);
                  }
                  setSidebarOpen(false);
                }}
                className={`w-72 rounded-full px-12 py-3 text-lg font-medium transition-colors ${
                  activePage === item.page
                    ? 'bg-white text-black'
                    : 'border border-white text-white'
                }`}
              >
                {item.name.toLowerCase()}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto mb-10">
            <div className="flex justify-center mb-16">
              <button className="border border-white rounded-full px-10 py-3 text-lg font-medium">
                get in touch
              </button>
            </div>
            
            <div className="px-6">
              <p className="text-gray-400">socials</p>
              <div className="border-b border-white w-full mt-1"></div>
              <div className="flex justify-between items-center mt-4 text-lg">
                <a href="#" className="hover:text-gray-300">inst</a>
                <a href="#" className="hover:text-gray-300">X</a>
                <a href="#" className="hover:text-gray-300">tg</a>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Main content */}
      <div ref={mainContentRef} className="flex-1 flex flex-col bg-black lg:ml-80 h-screen overflow-y-auto relative overflow-x-hidden">
        {/* Scrollable Mobile Header Content */}
        <div className="lg:hidden absolute top-0 left-0 right-0 w-full px-6 py-4 flex items-center z-20 text-white pointer-events-none">
          <span className="text-sm pointer-events-auto">{pageIndicator} - scroll ↓</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-20 h-20">
              <img src={`${import.meta.env.BASE_URL}Loggo.svg`} alt="Infamous Customs Logo" />
          </div>
        </div>

        {view === 'detail' && selectedCar ? renderCarDetailPage() : renderContent()}

      </div>
    </div>
  );
}

export default App;