/* ===== Demo Data ===== */
const demoUser = { username: "demo", password: "demo123" };

let trends = [
  { tag: "#BRANDS", text: "New Brand Has Released", posts: "100.4K" },
  { tag: "#FASHION", text: "Citayem Harajuku", posts: "89.2K" },
  { tag: "#TUMBLER", text: "New Product", posts: "45.1K" },
  { tag: "#ARTNFT", text: "New NFT", posts: "78.9K" },
];

let messages = [
  { name: "Terzla", unread: 4, avatar: "T", preview: "Thanks for the feedback!", time: "2m" },
  { name: "Harley", unread: 0, avatar: "H", preview: "See you tomorrow", time: "1h" },
  { name: "Leonard", unread: 2, avatar: "L", preview: "Great work on the project", time: "3h" },
  { name: "Ruby", unread: 4, avatar: "R", preview: "Can we schedule a meeting?", time: "5h" },
];

let posts = [
  {
    id: 1,
    user: "Shadow",
    avatar: "S",
    handle: "@mattshadow",
    text: "Hi All, This is my new Exploration, what do you think?",
    images: [
      "https://picsum.photos/600/400?random=1", 
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3"
    ],
    likes: 4,
    retweets: 2,
    comments: [
      { user: "Zakky", text: "Wow amazing work do you have 🔥!!" }
    ],
    time: "Just Now"
  },
  {
    id: 2,
    user: "Syn",
    avatar: "S",
    handle: "@synstargates",
    text: "When I tell you I love you, I don't say it out of habit. Beautiful sunset today! 🌅",
    images: ["https://picsum.photos/600/400?random=4"],
    likes: 12,
    retweets: 3,
    comments: [],
    time: "27 Dec"
  },
  {
    id: 3,
    user: "Ruby",
    avatar: "R",
    handle: "@rubygem",
    text: "Just finished an amazing photoshoot! Can't wait to share more 📸✨",
    images: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6"
    ],
    likes: 28,
    retweets: 7,
    comments: [
      { user: "Alex", text: "Stunning work! 😍" },
      { user: "Mike", text: "Professional quality!" }
    ],
    time: "2h"
  }
];

let additionalTrends = [
  { tag: "#TECH", text: "AI Revolution", posts: "234.5K" },
  { tag: "#MUSIC", text: "New Album Drop", posts: "156.2K" },
  { tag: "#TRAVEL", text: "Summer Destinations", posts: "98.7K" },
  { tag: "#FOOD", text: "Viral Recipe", posts: "67.3K" },
];

let additionalMessages = [
  { name: "Emma", unread: 1, avatar: "E", preview: "Let's catch up soon", time: "1d" },
  { name: "Jake", unread: 0, avatar: "J", preview: "Thanks for the help", time: "2d" },
  { name: "Sarah", unread: 3, avatar: "S", preview: "Important update", time: "3d" },
];

let currentUser = {
  name: "Demo User",
  handle: "@demo_user",
  avatar: "D"
};

let notifications = [
  { type: 'like', user: 'Shadow', text: 'liked your post', time: '2m' },
  { type: 'follow', user: 'Ruby', text: 'started following you', time: '1h' },
  { type: 'mention', user: 'Leonard', text: 'mentioned you in a post', time: '3h' }
];

let currentChat = null;
let chatMessages = {
  "Terzla": [
    { text: "Hey! How are you doing?", sender: "Terzla", time: "2:30 PM", own: false },
    { text: "I'm good, thanks! How about you?", sender: "You", time: "2:32 PM", own: true },
    { text: "Thanks for the feedback!", sender: "Terzla", time: "2:35 PM", own: false },
    { text: "No problem! Happy to help", sender: "You", time: "2:36 PM", own: true }
  ],
  "Harley": [
    { text: "See you tomorrow", sender: "Harley", time: "1:15 PM", own: false },
    { text: "Sure! What time?", sender: "You", time: "1:16 PM", own: true }
  ],
  "Leonard": [
    { text: "Great work on the project", sender: "Leonard", time: "11:20 AM", own: false },
    { text: "Thanks! Really appreciate it", sender: "You", time: "11:25 AM", own: true },
    { text: "When can we discuss the next steps?", sender: "Leonard", time: "11:30 AM", own: false }
  ],
  "Ruby": [
    { text: "Can we schedule a meeting?", sender: "Ruby", time: "9:15 AM", own: false }
  ]
};

/* ===== Utility Functions ===== */
function getInitials(name) {
  return name.charAt(0).toUpperCase();
}

function timeAgo(time) {
  return time;
}

/* ===== Login Logic ===== */
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Add loading state
    const btn = this.querySelector(".login-btn");
    const originalText = btn.textContent;
    btn.textContent = "Logging in...";
    btn.disabled = true;
    
    setTimeout(() => {
      if (username === demoUser.username && password === demoUser.password) {
        window.location.href = "home.html";
      } else {
        alert("Invalid credentials. Try demo / demo123");
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }, 1000);
  });
}

/* ===== Home Page Logic ===== */
if (document.getElementById("postFeed")) {
  const trendList = document.getElementById("trendList");
  const postFeed = document.getElementById("postFeed");
  const messageList = document.getElementById("messageList");
  const trendSearch = document.getElementById("trendSearch");
  const messageSearch = document.getElementById("messageSearch");
  const loadMoreBtn = document.getElementById("loadMoreTrends");

  let filteredTrends = [...trends];
  let filteredMessages = [...messages];

  function renderTrends() {
    trendList.innerHTML = "";
    filteredTrends.forEach(t => {
      const div = document.createElement("div");
      div.className = "trend-item";
      div.innerHTML = `
        <div class="trend-tag">${t.tag}</div>
        <div class="trend-text">${t.text}</div>
        <div class="trend-tag">${t.posts} posts</div>
      `;
      div.addEventListener("click", () => {
        // Simulate trend click
        console.log(`Clicked on trend: ${t.text}`);
      });
      trendList.appendChild(div);
    });
  }

  function renderMessages() {
    messageList.innerHTML = "";
    filteredMessages.forEach(m => {
      const div = document.createElement("div");
      div.className = "message-item";
      div.innerHTML = `
        <div class="message-avatar">${m.avatar}</div>
        <div class="message-info">
          <div class="message-name">${m.name}</div>
          <div class="message-preview">${m.preview}</div>
        </div>
        ${m.unread > 0 ? `<div class="unread-count">${m.unread}</div>` : ''}
      `;
      div.addEventListener("click", () => {
        // Simulate message click
        div.style.background = "#16181c";
        setTimeout(() => {
          div.style.background = "";
        }, 200);
        console.log(`Clicked on message from: ${m.name}`);
      });
      messageList.appendChild(div);
    });
  }

  function renderPosts() {
    postFeed.innerHTML = "";
    posts.forEach((p, index) => {
      const div = document.createElement("div");
      div.className = "post";
      
      let imageHTML = '';
      if (p.images.length > 0) {
        let gridClass = '';
        if (p.images.length === 1) gridClass = 'single';
        else if (p.images.length === 2) gridClass = 'two';
        else if (p.images.length === 3) gridClass = 'three';
        else gridClass = 'four';
        
        imageHTML = `
          <div class="post-images ${gridClass}">
            ${p.images.slice(0, 4).map((img, imgIndex) => `
              <img src="${img}" alt="Post image ${imgIndex + 1}" class="post-image" 
                   loading="lazy" onclick="openImageModal('${img}')"
                   ${p.images.length > 4 && imgIndex === 3 ? 
                     `style="position: relative;" data-extra="${p.images.length - 4}"` : ''}>
              ${p.images.length > 4 && imgIndex === 3 ? 
                `<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.6); display: flex; align-items: center; 
                justify-content: center; color: white; font-size: 24px; font-weight: 700;">
                +${p.images.length - 4}
                </div>` : ''}
            `).join('')}
          </div>
        `;
      }
      
      div.innerHTML = `
        <div class="post-header">
          <div class="post-avatar">${p.avatar}</div>
          <div>
            <span class="post-user">${p.user}</span>
            <span class="post-time">${p.handle} · ${p.time}</span>
          </div>
        </div>
        <div class="post-content">${p.text}</div>
        ${imageHTML}
        <div class="post-actions">
          <button class="action-btn comment-btn" onclick="toggleComments(${index})" ${isMobile() ? 'style="touch-action: manipulation;"' : ''}>
            💬 ${p.comments.length}
          </button>
          <button class="action-btn retweet-btn" onclick="retweetPost(${index})" ${isMobile() ? 'style="touch-action: manipulation;"' : ''}>
            🔄 ${p.retweets}
          </button>
          <button class="action-btn like-btn ${p.liked ? 'liked' : ''}" onclick="likePost(${index})" ${isMobile() ? 'style="touch-action: manipulation;"' : ''}>
            ${p.liked ? '❤️' : '🤍'} ${p.likes}
          </button>
          <button class="action-btn share-btn" onclick="sharePost(${index})" ${isMobile() ? 'style="touch-action: manipulation;"' : ''}>
            📤
          </button>
        </div>
        <div id="comments-${index}" class="comments-section" style="display: none;">
          ${p.comments.map(c => `
            <div class="comment">
              <strong>${c.user}:</strong> ${c.text}
            </div>
          `).join('')}
          <input type="text" class="comment-input" placeholder="Tweet your reply" 
                 onkeypress="addComment(event, ${index})" 
                 ${isMobile() ? 'style="font-size: 16px;"' : ''}>
        </div>
      `;
      postFeed.appendChild(div);
    });
  }

  // Search functionality
  if (trendSearch) {
    trendSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filteredTrends = trends.filter(t => 
        t.tag.toLowerCase().includes(query) || 
        t.text.toLowerCase().includes(query)
      );
      renderTrends();
    });
  }

  if (messageSearch) {
    messageSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      filteredMessages = messages.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.preview.toLowerCase().includes(query)
      );
      renderMessages();
    });
  }

  // Load more trends
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      trends = [...trends, ...additionalTrends];
      messages = [...messages, ...additionalMessages];
      filteredTrends = [...trends];
      filteredMessages = [...messages];
      renderTrends();
      renderMessages();
      
      // Add loading animation
      loadMoreBtn.textContent = "Loading...";
      setTimeout(() => {
        loadMoreBtn.textContent = "Load more";
      }, 500);
    });
  }

  // Post interaction functions
  window.likePost = function(index) {
    posts[index].liked = !posts[index].liked;
    if (posts[index].liked) {
      posts[index].likes++;
    } else {
      posts[index].likes--;
    }
    renderPosts();
  };

  window.retweetPost = function(index) {
    posts[index].retweets++;
    renderPosts();
    // Show feedback
    setTimeout(() => {
      alert("Retweeted!");
    }, 100);
  };

  window.sharePost = function(index) {
    const shareOptions = ['Copy link', 'Share via DM', 'Share to another app'];
    const choice = prompt(`Share post:\n1. ${shareOptions[0]}\n2. ${shareOptions[1]}\n3. ${shareOptions[2]}\n\nEnter choice (1-3):`);
    
    switch(choice) {
      case '1':
        navigator.clipboard.writeText(window.location.href + '#post-' + posts[index].id);
        showNotification('Link copied to clipboard!', 'success');
        break;
      case '2':
        showNotification('Share via DM feature coming soon!', 'info');
        break;
      case '3':
        if (navigator.share) {
          navigator.share({
            title: `Post by ${posts[index].user}`,
            text: posts[index].text,
            url: window.location.href
          });
        } else {
          showNotification('Share feature not supported on this device', 'info');
        }
        break;
    }
  };

  window.toggleComments = function(index) {
    const commentsDiv = document.getElementById(`comments-${index}`);
    commentsDiv.style.display = commentsDiv.style.display === "none" ? "block" : "none";
  };

  window.addComment = function(event, postIndex) {
    if (event.key === "Enter" && event.target.value.trim()) {
      const comment = {
        user: "You",
        text: event.target.value.trim()
      };
      posts[postIndex].comments.push(comment);
      event.target.value = "";
      renderPosts();
      // Keep comments open
      setTimeout(() => {
        document.getElementById(`comments-${postIndex}`).style.display = "block";
      }, 100);
    }
  };

  // New post functionality
  function setupNewPost() {
    const newPostInput = document.querySelector('.new-post-input');
    const postBtn = document.querySelector('.post-btn');
    
    if (newPostInput && postBtn) {
      let charCount = 0;
      const maxChars = 280;

      newPostInput.addEventListener('input', (e) => {
        charCount = e.target.value.length;
        
        // Update button state
        if (charCount > 0 && charCount <= maxChars) {
          postBtn.disabled = false;
          postBtn.style.opacity = '1';
        } else {
          postBtn.disabled = true;
          postBtn.style.opacity = '0.5';
        }

        // Show character count
        let counter = document.querySelector('.char-counter');
        if (!counter) {
          counter = document.createElement('span');
          counter.className = 'char-counter';
          counter.style.cssText = 'color: #71767b; font-size: 13px;';
          postBtn.parentNode.insertBefore(counter, postBtn);
        }
        
        counter.textContent = `${charCount}/${maxChars}`;
        counter.style.color = charCount > maxChars ? '#f91880' : '#71767b';
      });

      postBtn.addEventListener('click', (e) => {
        if (postBtn.disabled) return;
        
        const content = newPostInput.value.trim();
        if (content && content.length <= maxChars) {
          const newPost = {
            id: Date.now(),
            user: currentUser.name,
            avatar: currentUser.avatar,
            handle: currentUser.handle,
            text: content,
            images: [],
            likes: 0,
            retweets: 0,
            comments: [],
            time: "now",
            liked: false
          };
          
          posts.unshift(newPost);
          newPostInput.value = "";
          
          // Reset counter and button
          const counter = document.querySelector('.char-counter');
          if (counter) counter.remove();
          postBtn.disabled = true;
          postBtn.style.opacity = '0.5';
          
          renderPosts();
          showNotification('Post published!', 'success');
        }
      });
    }
  }

  /* ===== Responsive Helper Functions ===== */
function isMobile() {
  return window.innerWidth <= 768;
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function handleResize() {
  const sidebar = document.querySelector('.sidebar');
  const messages = document.querySelector('.messages');
  const feed = document.querySelector('.feed');
  
  if (isMobile()) {
    // Mobile optimizations
    if (currentChat) {
      // Hide sidebar when in chat on mobile
      if (sidebar) sidebar.style.display = 'none';
    } else {
      if (sidebar) sidebar.style.display = 'block';
    }
  } else {
    // Desktop/tablet view
    if (sidebar) sidebar.style.display = 'block';
  }
  
  // Re-render components for new screen size
  if (document.getElementById("postFeed")) {
    renderPosts();
  }
}

// Add resize listener
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => {
  setTimeout(handleResize, 100);
});

  // Navigation functionality
  function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-icons li');
    
    navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Mobile scroll to active item
        if (isMobile()) {
          item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
        
        // Handle navigation
        const text = item.textContent.trim();
        handleNavigation(text, index);
      });
    });

    // Add notification dots to some items
    if (navItems.length > 2) navItems[2].classList.add('has-notification');
    if (navItems.length > 3) navItems[3].classList.add('has-notification');
  }

  function handleNavigation(navText, index) {
    const feedTitle = document.querySelector('.feed-title');
    
    switch(index) {
      case 0: // Home
        feedTitle.textContent = 'HomePage';
        showNotification('Switched to Home feed', 'success');
        break;
      case 1: // Explore
        feedTitle.textContent = 'Explore';
        showNotification('Exploring trending topics', 'info');
        break;
      case 2: // Notifications
        feedTitle.textContent = 'Notifications';
        showNotifications();
        break;
      case 3: // Messages
        feedTitle.textContent = 'Messages';
        showMessages();
        break;
      case 4: // Bookmarks
        feedTitle.textContent = 'Bookmarks';
        showBookmarks();
        break;
      case 5: // Profile
        feedTitle.textContent = 'Profile';
        showProfile();
        break;
      case 6: // Settings
        feedTitle.textContent = 'Settings';
        showSettings();
        break;
    }
  }

  function showNotifications() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div style="padding: 20px;">
        <h2>Notifications</h2>
        ${notifications.map(notif => `
          <div class="notification-item" style="padding: 16px; border-bottom: 1px solid #2f3336; display: flex; align-items: center;">
            <div class="message-avatar">${notif.user[0]}</div>
            <div style="margin-left: 12px; flex: 1;">
              <p><strong>${notif.user}</strong> ${notif.text}</p>
              <p style="color: #71767b; font-size: 13px;">${notif.time}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function showMessages() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div style="padding: 20px;">
        <h2>Direct Messages</h2>
        ${messages.map(msg => `
          <div class="message-conversation" style="padding: 16px; border-bottom: 1px solid #2f3336; cursor: pointer;" onclick="openChat('${msg.name}')">
            <div style="display: flex; align-items: center;">
              <div class="message-avatar">${msg.avatar}</div>
              <div style="margin-left: 12px; flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <p style="font-weight: 700;">${msg.name}</p>
                  <span style="color: #71767b; font-size: 13px;">${msg.time}</span>
                </div>
                <p style="color: #71767b; margin-top: 4px;">${msg.preview}</p>
              </div>
              ${msg.unread > 0 ? `<div class="unread-count">${msg.unread}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.openChat = function(userName) {
    currentChat = userName;
    const user = messages.find(m => m.name === userName);
    if (!user) return;

    // Mark messages as read
    user.unread = 0;
    
    // Hide sidebar on mobile when opening chat
    if (isMobile()) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = 'none';
    }
    
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div class="chat-container">
        <div class="chat-header">
          <button class="chat-back-btn" onclick="closeChatMobile('${userName}')">←</button>
          <div class="chat-user-info">
            <div class="message-avatar">${user.avatar}</div>
            <div>
              <div class="chat-user-name">${user.name}</div>
              <div class="chat-user-status">Active now</div>
            </div>
          </div>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          ${renderChatMessages(userName)}
        </div>
        
        <div id="typingIndicator" style="display: none;" class="typing-indicator">
          ${user.name} is typing
          <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <div class="chat-actions">
              <button class="chat-action-btn" title="Add photo">📷</button>
              <button class="chat-action-btn" title="Add emoji">😊</button>
            </div>
            <textarea 
              id="chatInput" 
              class="chat-input" 
              placeholder="Start a new message"
              rows="1"
            ></textarea>
            <button id="chatSendBtn" class="chat-send-btn" disabled>
              ➤
            </button>
          </div>
        </div>
      </div>
    `;

    setupChatInput(userName);
    scrollToBottom();
    showNotification(`Opened chat with ${userName}`, 'success');
  };

  // New function to handle chat closing on mobile
  window.closeChatMobile = function(userName) {
    currentChat = null;
    
    // Show sidebar on mobile when closing chat
    if (isMobile()) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.style.display = 'block';
    }
    
    showMessages();
  };

  // Enhanced message sending with mobile optimizations
  function sendMessage(userName) {
    const chatInput = document.getElementById('chatInput');
    const text = chatInput.value.trim();
    
    if (!text) return;

    // Haptic feedback on mobile
    if ('vibrate' in navigator && isMobile()) {
      navigator.vibrate(50);
    }

    // Add message to chat data
    if (!chatMessages[userName]) {
      chatMessages[userName] = [];
    }
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newMessage = {
      text: text,
      sender: "You",
      time: currentTime,
      own: true
    };

    chatMessages[userName].push(newMessage);
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Update UI
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = renderChatMessages(userName);
    
    // Disable send button
    const chatSendBtn = document.getElementById('chatSendBtn');
    chatSendBtn.disabled = true;
    chatSendBtn.classList.remove('active');
    
    // Scroll to bottom
    scrollToBottom();
    
    // Show notification
    showNotification('Message sent!', 'success');
    
    // Update last message preview in messages list
    const messageUser = messages.find(m => m.name === userName);
    if (messageUser) {
      messageUser.preview = text.length > 30 ? text.substring(0, 30) + '...' : text;
      messageUser.time = 'now';
    }

    // Simulate reply after delay
    setTimeout(() => {
      simulateReply(userName);
    }, 2000 + Math.random() * 3000);
  }

  // Enhanced scroll to bottom for mobile
  function scrollToBottom() {
    setTimeout(() => {
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Smooth scroll on mobile
        if (isMobile()) {
          chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
          });
        }
      }
    }, 50);
  }

  // Initialize
  initializeNavigation();
  setupNewPost();
  renderTrends();
  renderMessages();
  renderPosts();
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  const colors = {
    success: '#1d9bf0',
    error: '#f91880',
    info: '#1d9bf0',
    warning: '#ffad1f'
  };
  
  const isMobileDevice = isMobile();
  
  notification.style.cssText = `
    position: fixed;
    ${isMobileDevice ? 'top: 70px; left: 20px; right: 20px;' : 'top: 20px; right: 20px;'}
    background: ${colors[type]};
    color: white;
    padding: ${isMobileDevice ? '12px 16px' : '16px 24px'};
    border-radius: 8px;
    z-index: 1001;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    font-weight: 500;
    max-width: ${isMobileDevice ? 'none' : '300px'};
    font-size: ${isMobileDevice ? '14px' : '16px'};
    text-align: ${isMobileDevice ? 'center' : 'left'};
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Haptic feedback on mobile
  if ('vibrate' in navigator && isMobileDevice) {
    navigator.vibrate(50);
  }
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Image modal functionality
window.openImageModal = function(imageSrc) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;
  
  const img = document.createElement('img');
  img.src = imageSrc;
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  `;
  
  modal.appendChild(img);
  document.body.appendChild(modal);
  
  modal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Escape key to close
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
};

// Initialize navbar functionality
function initializeNavbar() {
  const navbarBtns = document.querySelectorAll('.navbar-btn');
  navbarBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      navbarBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      btn.classList.add('active');
      
      // Handle navbar actions
      const title = btn.getAttribute('title');
      switch(title) {
        case 'Search':
          showNotification('Opening search...', 'info');
          break;
        case 'Notifications':
          handleNavigation('Notifications', 2);
          break;
        case 'Messages':
          handleNavigation('Messages', 3);
          break;
        case 'Profile':
          handleNavigation('Profile', 5);
          break;
      }
    });
  });
}

  function renderChatMessages(userName) {
    const messages = chatMessages[userName] || [];
    return messages.map(msg => `
      <div class="chat-message ${msg.own ? 'own' : ''}">
        ${!msg.own ? `<div class="message-avatar">${userName[0]}</div>` : ''}
        <div>
          <div class="message-bubble">${msg.text}</div>
          <div class="message-time">${msg.time}</div>
        </div>
      </div>
    `).join('');
  }

  function setupChatInput(userName) {
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    
    let typingTimer;
    let isTyping = false;

    if (!chatInput || !chatSendBtn) return;

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      
      // Update send button state
      const hasText = this.value.trim().length > 0;
      chatSendBtn.disabled = !hasText;
      chatSendBtn.classList.toggle('active', hasText);

      // Show typing indicator (simulate other user seeing it)
      clearTimeout(typingTimer);
      if (hasText && !isTyping) {
        isTyping = true;
        // In a real app, this would send a typing event to other users
      }
      
      typingTimer = setTimeout(() => {
        isTyping = false;
      }, 1000);
    });

    // Send message on Enter (but Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(userName);
      }
    });

    // Send message on button click
    chatSendBtn.addEventListener('click', () => {
      sendMessage(userName);
    });

    // Focus input
    setTimeout(() => chatInput.focus(), 100);
  }

  function simulateReply(userName) {
    if (currentChat !== userName) return; // Only if chat is still open

    const replies = [
      "Thanks for your message!",
      "Got it, thanks!",
      "That sounds great!",
      "I agree with that",
      "Let me think about it",
      "Absolutely!",
      "That works for me",
      "Good point!",
      "I'll get back to you on that",
      "Perfect timing!"
    ];

    // Show typing indicator
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.style.display = 'flex';
      scrollToBottom();
    }

    // Send reply after typing delay
    setTimeout(() => {
      if (typingIndicator) {
        typingIndicator.style.display = 'none';
      }

      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      const replyMessage = {
        text: randomReply,
        sender: userName,
        time: currentTime,
        own: false
      };

      if (!chatMessages[userName]) {
        chatMessages[userName] = [];
      }
      chatMessages[userName].push(replyMessage);

      // Update UI if chat is still open
      if (currentChat === userName) {
        const chatMessagesContainer = document.getElementById('chatMessages');
        if (chatMessagesContainer) {
          chatMessagesContainer.innerHTML = renderChatMessages(userName);
          scrollToBottom();
        }
      }

      // Update message preview
      const messageUser = messages.find(m => m.name === userName);
      if (messageUser) {
        messageUser.preview = randomReply;
        messageUser.time = 'now';
        messageUser.unread = currentChat === userName ? 0 : (messageUser.unread || 0) + 1;
      }

      // Show notification if chat is not currently open
      if (currentChat !== userName) {
        showNotification(`New message from ${userName}`, 'info');
      }

      // Re-render messages list if it's currently displayed
      if (document.querySelector('.message-conversation')) {
        renderMessages();
      }
    }, 1000 + Math.random() * 2000); // 1-3 second typing delay
  }

  function showBookmarks() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Bookmarks</h2>
        <p style="color: #71767b; margin-top: 20px;">Save posts for later by clicking the bookmark icon</p>
        <div style="margin-top: 40px;">
          <span style="font-size: 48px;">🔖</span>
          <p style="margin-top: 16px;">No bookmarks yet</p>
        </div>
      </div>
    `;
  }

  function showProfile() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div style="padding: 20px;">
        <div class="profile-header" style="text-align: center; padding: 40px 0; border-bottom: 1px solid #2f3336;">
          <div class="profile-avatar" style="width: 80px; height: 80px; margin: 0 auto 16px; font-size: 32px;">${currentUser.avatar}</div>
          <h2>${currentUser.name}</h2>
          <p style="color: #71767b; margin-top: 4px;">${currentUser.handle}</p>
          <div style="display: flex; justify-content: center; gap: 40px; margin-top: 20px;">
            <div><strong>42</strong><br><span style="color: #71767b;">Following</span></div>
            <div><strong>1.2K</strong><br><span style="color: #71767b;">Followers</span></div>
            <div><strong>89</strong><br><span style="color: #71767b;">Posts</span></div>
          </div>
        </div>
        <div style="padding-top: 20px;">
          <h3>Your Posts</h3>
          ${posts.filter(p => p.user === 'You').map(p => `
            <div class="post">
              <div class="post-content">${p.text}</div>
              <div class="post-actions">
                <span>❤️ ${p.likes}</span>
                <span>💬 ${p.comments.length}</span>
              </div>
            </div>
          `).join('') || '<p style="color: #71767b; text-align: center; margin-top: 40px;">No posts yet</p>'}
        </div>
      </div>
    `;
  }

  function showSettings() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = `
      <div style="padding: 20px;">
        <h2>Settings</h2>
        <div class="settings-section" style="margin-top: 30px;">
          <div class="setting-item" style="padding: 16px 0; border-bottom: 1px solid #2f3336;">
            <h4>Account Settings</h4>
            <p style="color: #71767b; margin-top: 4px;">Manage your account information</p>
          </div>
          <div class="setting-item" style="padding: 16px 0; border-bottom: 1px solid #2f3336;">
            <h4>Privacy & Safety</h4>
            <p style="color: #71767b; margin-top: 4px;">Control your privacy settings</p>
          </div>
          <div class="setting-item" style="padding: 16px 0; border-bottom: 1px solid #2f3336;">
            <h4>Notifications</h4>
            <p style="color: #71767b; margin-top: 4px;">Choose what notifications you receive</p>
          </div>
          <div class="setting-item" style="padding: 16px 0; border-bottom: 1px solid #2f3336;">
            <h4>Display</h4>
            <p style="color: #71767b; margin-top: 4px;">Customize your display settings</p>
          </div>
          <div class="setting-item" style="padding: 16px 0; border-bottom: 1px solid #2f3336; cursor: pointer;" onclick="logout()">
            <h4 style="color: #f91880;">Log out</h4>
          </div>
        </div>
      </div>
    `;
  }

  window.logout = function() {
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = 'login.html';
    }
  };

// Initialize everything
if (document.getElementById("postFeed")) {
  // Initial responsive setup
  handleResize();
  initializeNavigation();
  initializeNavbar();
  setupNewPost();
  renderTrends();
  renderMessages();
  renderPosts();
}
