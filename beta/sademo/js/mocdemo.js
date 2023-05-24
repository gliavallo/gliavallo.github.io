 let engagementChat;
        sm.getApi({ version: 'v1' }).then(function (api) {
            api.addEventListener(api.EVENTS.ENGAGEMENT_START, (engagement) => {
                engagementChat = engagement.chat;
                const engagementId = localStorage.getItem('engagementId');
                if (engagementId !== engagement.engagementId) {
                    engagement.recordEvent({ message: 'banking-start' });
                    localStorage.setItem('engagementId', engagement.engagementId);
                }
            });
            api.visitorApp.setChatMessageRenderer(function (message) {
                const processedCardContainers =
                    JSON.parse(localStorage.getItem('processedCardContainers')) || [];

                if (processedCardContainers.includes(message.id)) {
                    debugger
                    const element = document.createElement('div');
                    element.classList.add('custom-policy-number-container');
                    element.classList.add('sm-operator-chat-box');

                    const chatTextContainer = document.createElement('div');
                    chatTextContainer.classList.add('sm-chat-text');
                    chatTextContainer.innerHTML = message.content;
                    chatTextContainer.setAttribute('style', 'font-weight:bold;');

                    element.appendChild(chatTextContainer);
                    return element;
                }

                if (message.metadata && message.metadata.customMessage) {
                    const chatSenderPlaceholder = message.sender_details.name.slice(0, 1);
                    const div = document.createElement('div');
                    div.className = 'sm-chat-box-container';
                    div.innerHTML = `
                    <div class="sm-chat-box-image">
                        <div class="sm-chat-sender-placeholder">${chatSenderPlaceholder}</div>
                    </div>
                    <div class="sm-chat-box-message">
                        <div class="sm-operator-chat-box">
                            <span><div class="sm-chat-text">${message.content}</div></span>
                        </div>
                    </div>`;
                    return div;
                }
            });
        });
