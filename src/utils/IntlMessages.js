const languages = {
    enUS: {
        userNotFound: (id) => `User with id ${id} not found!`
    },
}

/**
 * Get sanitized string message. This will return a function or a message
 * depending what was defined.
 * @param {string} messageId
 * @param {string} [lng = 'enUS']
 * @memberof IntlMessages
*/
export function getMessage(messageId, lng = 'enUS') {
    if(languages && languages[lng] && languages[lng][messageId]) return languages[lng][messageId];

    return `Message with id ${messageId} not found!`;
}