/** @format */

export const TimeNow = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const validateDocument = (data: any, update: boolean): string[] | null => {
  let title: string = data.title;
  let content: string = data.content;

  let message: string[] = [];

  // validate data
  if (title == null || title == '') {
    message.push('content must be filled in');
  } else {
    if (typeof title != 'string') {
      message.push('content must be String');
    }
  }

  if (content == null || content == '') {
    message.push('content must be filled in');
  } else {
    if (typeof content != 'string') {
      message.push('content must be String');
    }
  }

  if (update) {
    let author_id: number = data.author;
    if (author_id == null && update) {
      message.push('Author must be filled in');
    } else {
      if (typeof author_id != 'number') {
        message.push('Author must be number');
      }
    }
  } else {
    let creator_id: number = data.creator;
    if (creator_id == null && !update) {
      message.push('creator must be filled in');
    } else {
      if (typeof creator_id != 'number') {
        message.push('creator must be number');
      }
    }
  }

  if (message.length > 0) {
    return message;
  }

  return null;
};
export const validatePublish = (data: any): string[] | null => {
  let id: string = data.id;
  let version: number = data.version;

  let message: string[] = [];

  // validate data
  if (id == null || id == '') {
    message.push('Document Id must be filled in');
  } else {
    if (typeof id != 'string') {
      message.push('Document Id must be String');
    }
  }

  if (version == null ) {
    message.push('version must be filled in');
  } else {
    if (typeof version != 'number') {
      message.push('version must be Number');
    }
  }

  if (message.length > 0) {
    return message;
  }

  return null;
};
