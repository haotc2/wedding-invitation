import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { config } from './config';
import './App.css';

// Components
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-new">
      <audio ref={audioRef} src={config.audioUrl} loop />
      <button className={`music-toggle-new ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
        {isPlaying ? '🎵' : '🔇'}
      </button>
    </div>
  );
};

const FallingHearts = () => {
  return (
    <div className="falling-hearts-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="heart-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 20}s`, // Rất chậm (20-35s)
            animationDelay: `${Math.random() * 15}s`,
            fontSize: `${Math.random() * 12 + 10}px`,
            opacity: Math.random() * 0.4 + 0.2, // Mờ ảo hơn
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};


/* Hệ thống tự động chuyển đổi link Drive sang định dạng thumbnail (được nén và tối ưu nhất để tránh lỗi 429) */
const getDirectLink = (url, width = 1200) => {
  if (url && typeof url === 'string' && url.includes('drive.google.com')) {
    const id = url.match(/[-\w]{25,}/);
    // Sử dụng thumbnail API ổn định hơn và ít bị Google "phạt" 429 hơn so với lấy ảnh gốc trực tiếp
    if (id) return `https://drive.google.com/thumbnail?id=${id[0]}&sz=w${width}`;
  }
  return url;
};

const Hero = ({ remoteConfig }) => {
  const mainEvent = config.events[1] || config.events[0];
  const [day, month, year] = mainEvent.dayMonth.split('/').concat(mainEvent.year);
  const mainBackground = getDirectLink(remoteConfig?.mainbackground || config.mainBackground, 1600);

  return (
    <section className="hero">
      <img src={mainBackground} alt="" className="hero-bg-img" />
      <div className="hero-overlay"></div>
      <FallingHearts />
      <div className="hero-glass-container" data-aos="zoom-in" data-aos-duration="1500">
        <p className="hero-script-subtitle">Save The Date</p>

        <div className="hero-names-new">
          <h1 className="hero-name-text">{config.groom.name}</h1>
          <span className="hero-ampersand">&</span>
          <h1 className="hero-name-text">{config.bride.name}</h1>
        </div>

        <div className="hero-date-block">
          <div className="date-item side">{mainEvent.dayOfWeek.toUpperCase()}</div>
          <div className="date-item center">
            <span className="day-number">{day}.{month}</span>
            <span className="month-year">{year}</span>
          </div>
          <div className="date-item side">{mainEvent.time.replace(':', 'H')}</div>
        </div>

        <div className="hero-location-block">
          <p className="location-intro">Địa điểm tổ chức</p>
          <h2 className="location-name">{mainEvent.location}</h2>
          <p className="location-address">{mainEvent.address}</p>
        </div>

        <div className="hero-bottom-icons">
          <button className="glass-icon-btn" onClick={() => window.open(`tel:${config.groom.phone}`)}>📞</button>
          <button className="glass-icon-btn" onClick={() => window.scrollTo({ top: document.querySelector('.couple').offsetTop, behavior: 'smooth' })}>🏠</button>
          <button className="glass-icon-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mainEvent.address)}`)}>📍</button>
        </div>
      </div>
    </section>
  );
};

// Countdown moved below Events

const Couple = ({ remoteConfig }) => {
  const groomImage = getDirectLink(remoteConfig?.groomimage || config.groom.image, 800);
  const brideImage = getDirectLink(remoteConfig?.brideimage || config.bride.image, 800);

  return (
    <section className="couple bg-white">
      <div className="container">
        <div className="couple-header" data-aos="fade-up" style={{ position: 'relative' }}>
          <p className="intro-text">GIỚI THIỆU</p>
          <h2 className="couple-title">CÔ DÂU VÀ CHÚ RỂ</h2>
          <MusicPlayer />
        </div>
        <div className="couple-grid-new">
          <div className="couple-card" data-aos="fade-right" style={{ backgroundImage: `url(${groomImage})` }}>
            <div className="card-overlay-gradient"></div>
            <div className="card-content">
              <h3 className="card-name">{config.groom.name}</h3>
              <p className="card-date">{config.groom.birthDate}</p>
              <p className="card-bio">{config.groom.bio}</p>
              <div className="card-socials">
                <button className="social-icon-btn">📞</button>
                <button className="social-icon-btn">f</button>
                <button className="social-icon-btn">𝕏</button>
                <button className="social-icon-btn">📸</button>
              </div>
            </div>
          </div>
          <div className="couple-card" data-aos="fade-left" style={{ backgroundImage: `url(${brideImage})` }}>
            <div className="card-overlay-gradient"></div>
            <div className="card-content">
              <h3 className="card-name">{config.bride.name}</h3>
              <p className="card-date">{config.bride.birthDate}</p>
              <p className="card-bio">{config.bride.bio}</p>
              <div className="card-socials">
                <button className="social-icon-btn">📞</button>
                <button className="social-icon-btn">f</button>
                <button className="social-icon-btn">𝕏</button>
                <button className="social-icon-btn">📸</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = ({ remoteGallery }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images = remoteGallery || [];

  useEffect(() => {
    // Xử lý khóa cuộn chuột khi xem ảnh
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIndex]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gallery bg-white">
      <div className="container">
        <h2 className="couple-title" data-aos="fade-up">ALBUM ẢNH</h2>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={idx * 50}
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={getDirectLink(img, 400)} alt={`Gallery ${idx}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setSelectedIndex(null)}>
          <button className="lightbox-close" onClick={() => setSelectedIndex(null)}>✕</button>
          <button className="lightbox-nav prev" onClick={handlePrev}>&#10094;</button>
          <img src={images[selectedIndex]} alt="Enlarged" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-nav next" onClick={handleNext}>&#10095;</button>
        </div>
      )}
    </section>
  );
};

const Events = ({ remoteConfig }) => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  return (
    <>
      <div className="events-container-new">
        {config.events.map((event, idx) => {
          const [day, month] = event.dayMonth.split('/');
          const remoteKey = `event${idx + 1}image`;
          const eventImage = getDirectLink(remoteConfig?.[remoteKey] || event.image, 800);

          return (
            <div key={idx} className="event-card-new" data-aos="fade-up" data-aos-delay={idx * 200}>
              <div className="event-arch-wrapper">
                <img src={eventImage} alt={event.title} className="event-arch-img-new" />
              </div>

              <div className="event-info-new">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-location-name-new">{event.location}</p>
                <p className="event-address-new">{event.address}</p>
                <p className="event-time-new">Vào lúc <strong>{event.time}</strong></p>

                <div className="event-date-row-new">
                  <div className="date-box-side">
                    <span className="date-day-week">{event.dayOfWeek}</span>
                  </div>
                  <div className="date-center-main">
                    <span className="date-day-large">{day}</span>
                    <span className="date-slash">/</span>
                    <span className="date-day-large">{month}</span>
                  </div>
                  <div className="date-box-side">
                    <span className="date-year-small">{event.year}</span>
                  </div>
                </div>

                <p className="event-lunar-new">Nhằm ngày {event.lunarDate}</p>

                <div className="event-social-icons-new">
                  <button className="event-icon-circle" onClick={() => setShowPhonePopup(true)}>📞</button>
                  <button className="event-icon-circle" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`)}>📍</button>
                  <button className="event-icon-circle">f</button>
                  <button className="event-icon-circle">𝕏</button>
                  <button className="event-icon-circle">📸</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phone Popup Modal */}
      {showPhonePopup && (
        <div className="lightbox-overlay popup-overlay" onClick={() => setShowPhonePopup(false)}>
          <div className="popup-content card" onClick={(e) => e.stopPropagation()} data-aos="zoom-in">
            <button className="popup-close" onClick={() => setShowPhonePopup(false)}>✕</button>
            <h3 className="couple-title">Liên hệ</h3>
            <div className="phone-list">
              <a href={`tel:${config.groom.phone}`} className="phone-item">
                <div className="phone-info">
                  <span className="phone-role">Gọi Chú rể</span>
                  <span className="phone-name">{config.groom.name}</span>
                </div>
                <strong className="phone-number">{config.groom.phone}</strong>
              </a>
              <a href={`tel:${config.bride.phone}`} className="phone-item">
                <div className="phone-info">
                  <span className="phone-role">Gọi Cô dâu</span>
                  <span className="phone-name">{config.bride.name}</span>
                </div>
                <strong className="phone-number">{config.bride.phone}</strong>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Countdown = ({ remoteConfig }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(config.weddingDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-banner-section-new">
      <div className="container-wide">
        <div className="countdown-banner-wrapper-new" data-aos="fade-up">
          <div className="countdown-content-new">
            <p className="countdown-subtitle-new">CÙNG ĐẾM NGƯỢC THỜI GIAN</p>
            <h2 className="countdown-title-new">Save The Date</h2>


            <div className="countdown-grid-new-banner">
              {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => {
                const value = timeLeft[unit];
                const label = unit === 'days' ? 'Ngày' : unit === 'hours' ? 'Giờ' : unit === 'minutes' ? 'Phút' : 'Giây';
                return (
                  <div key={unit} className="countdown-box-new" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <span className="value">{value !== undefined && !isNaN(value) ? String(value).padStart(2, '0') : '00'}</span>
                    <span className="unit">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="countdown-events-wrapper">
          <Events remoteConfig={remoteConfig} />
        </div>
      </div>
    </section>
  );
};

const Timeline = () => (
  <section className="timeline bg-white">
    <div className="container">
      <h2 data-aos="fade-up">Wedding Timeline</h2>
      <div className="timeline-items">
        {config.timeline.map((item, idx) => (
          <div key={idx} className="timeline-item" data-aos="fade-up" data-aos-delay={idx * 100}>
            <span className="time">{item.time}</span>
            <span className="dot"></span>
            <span className="desc">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!config.googleSheetUrl || config.googleSheetUrl === "YOUR_GOOGLE_SHEET_URL") {
      alert("Bạn chưa cấu hình Google Sheets URL. Vui lòng xem hướng dẫn để lấy link!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    for (const [key, value] of formData) {
      params.append(key, value);
    }

    try {
      await fetch(config.googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        body: params
      });

      alert("Cảm ơn bạn đã báo danh! Dữ liệu đã được ghi nhận.");
      e.target.reset();
    } catch (error) {
      alert("Có lỗi kết nối, vui lòng thử lại sau.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="rsvp bg-white">
      <div className="container" data-aos="fade-up">
        <h2>Xác nhận tham dự</h2>
        <p>Hãy cho chúng tôi biết bạn sẽ đến tham dự nhé!</p>
        <form className="rsvp-form card" data-aos="zoom-in" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Họ và tên" required />
          <select name="count" required>
            <option value="">Số người tham dự</option>
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4+">4+ người</option>
          </select>
          <textarea name="message" placeholder="Lời nhắn gửi..." rows="4"></textarea>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
          </button>
        </form>
      </div>
    </section>
  );
};

const BankInfo = () => (
  <section className="bank-info">
    <div className="container">
      <h2 data-aos="fade-up">Gửi quà đến Cô dâu & Chú rể</h2>
      <div className="bank-grid">
        <div className="bank-card card" data-aos="flip-left">
          <h3>Mừng cưới Chú rể</h3>
          <p>{config.bankInfo.groom.bank}</p>
          <p>STK: {config.bankInfo.groom.accountNumber}</p>
          <p>Tên: {config.bankInfo.groom.accountName}</p>
        </div>
        <div className="bank-card card" data-aos="flip-right">
          <h3>Mừng cưới Cô dâu</h3>
          <p>{config.bankInfo.bride.bank}</p>
          <p>STK: {config.bankInfo.bride.accountNumber}</p>
          <p>Tên: {config.bankInfo.bride.accountName}</p>
        </div>
      </div>
    </div>
  </section>
);

function App() {
  const [showRsvpIcon, setShowRsvpIcon] = useState(true);

  // Khởi tạo state từ cache trong localStorage để hiện ảnh ngay lập tức khi load trang
  const [remoteData, setRemoteData] = useState(() => {
    const cached = localStorage.getItem('wedding_config_cache');
    return cached ? JSON.parse(cached) : { config: {}, gallery: config.gallery || [] };
  });

  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const response = await fetch(config.googleSheetUrl);
        const data = await response.json();
        if (data && typeof data === 'object' && data.config) {
          const lowerConfig = {};
          Object.keys(data.config).forEach(key => {
            lowerConfig[key.toLowerCase()] = data.config[key];
          });

          const newRemoteData = {
            config: lowerConfig,
            gallery: (data.gallery && data.gallery.length > 0) ? data.gallery : config.gallery
          };

          setRemoteData(newRemoteData);
          // Lưu vào cache cho lần sau
          localStorage.setItem('wedding_config_cache', JSON.stringify(newRemoteData));
        }
      } catch (error) {
        console.error("Error fetching remote config:", error);
      }
    };
    fetchRemoteData();

    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });

    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;
      setShowRsvpIcon(!isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Hero remoteConfig={remoteData.config} />
      <Couple remoteConfig={remoteData.config} />
      <Gallery remoteGallery={remoteData.gallery} />
      <Countdown remoteConfig={remoteData.config} />
      <Timeline />
      <RSVP />
      <BankInfo />
      <footer className="footer">
        <p className="couple-title" data-aos="fade-up">Thank You!</p>
        <p data-aos="fade-up" data-aos-delay="200">Sự hiện diện của bạn sẽ khiến hôn lễ của chúng tôi trở nên ý nghĩa hơn bao giờ hết!</p>
      </footer>
      {showRsvpIcon && (
        <button className="floating-rsvp-btn" onClick={() => document.querySelector('.rsvp').scrollIntoView({ behavior: 'smooth' })}>
          RSVP
        </button>
      )}
    </div>
  );
}

export default App;
