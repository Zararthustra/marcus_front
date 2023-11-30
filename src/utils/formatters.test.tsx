import { expect, test, describe } from 'vitest';

import {
  IconError,
  IconInfo,
  IconLoader,
  IconSuccess,
  IconWarning
} from '@assets/index';
import {
  JsonToHtml,
  capitalizeFirstLetter,
  getPlatformUri,
  messageObject,
  toastObject
} from './formatters';

describe('Format Text', () => {
  test('Capitalize first letter', async () => {
    const sentence = capitalizeFirstLetter('lorem ipsum');
    expect(sentence).toStrictEqual('Lorem ipsum');
  });

  test('Get tv URI', async () => {
    const platformUri = getPlatformUri('tv');
    expect(platformUri).toStrictEqual('series');
  });

  test('Get movie URI', async () => {
    const platformUri = getPlatformUri('movie');
    expect(platformUri).toStrictEqual('films');
  });

  test('JSON to HTML', async () => {
    const json = JsonToHtml({ json: { key: 'value' } });
    expect(json).toStrictEqual(
      <pre>
        <code>{JSON.stringify({ key: 'value' }, null, 4)}</code>
      </pre>
    );
  });
});

describe('Format Toast', () => {
  test('Toast Success', async () => {
    const successToast = toastObject('success', 'title', 'desc');
    expect(successToast).toStrictEqual({
      icon: <IconSuccess />,
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-green-500)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast Error', async () => {
    const errorToast = toastObject('error', 'title', 'desc');
    expect(errorToast).toStrictEqual({
      icon: <IconError />,
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-red-500)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast Warning', async () => {
    const warningToast = toastObject('warning', 'title', 'desc');
    expect(warningToast).toStrictEqual({
      icon: <IconWarning />,
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-orange-500)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast Info', async () => {
    const infoToast = toastObject('info', 'title', 'desc');
    expect(infoToast).toStrictEqual({
      icon: <IconInfo />,
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-blue-400)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast Loading', async () => {
    const loadingToast = toastObject('loading', 'title', 'desc');
    expect(loadingToast).toStrictEqual({
      icon: (
        <IconLoader width={24} height={24} color="var(--color-primary-700)" />
      ),
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-primary-700)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast Default', async () => {
    // @ts-ignore
    const defaultToast = toastObject('bug', 'title', 'desc');
    expect(defaultToast).toStrictEqual({
      icon: <IconError />,
      placement: 'top',
      style: { borderLeft: `4px solid black` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>
    });
  });

  test('Toast with Key', async () => {
    const keyToast = toastObject('success', 'title', 'desc', 'key');
    expect(keyToast).toStrictEqual({
      icon: <IconSuccess />,
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-green-500)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>,
      duration: 4,
      key: 'key'
    });
  });

  test('Toast with loading Key', async () => {
    const keyToast = toastObject('loading', 'title', 'desc', 'key');
    expect(keyToast).toStrictEqual({
      icon: (
        <IconLoader width={24} height={24} color="var(--color-primary-700)" />
      ),
      placement: 'top',
      style: { borderLeft: `4px solid var(--color-primary-700)` },
      message: <h3>title</h3>,
      description: <p className="f-m m-0">desc</p>,
      duration: 200,
      key: 'key'
    });
  });
});

describe('Format Message', () => {
  test('Message Success', async () => {
    const successMessage = messageObject('success', 'message');
    expect(successMessage).toStrictEqual({
      icon: <IconSuccess />,
      content: 'message'
    });
  });

  test('Message Error', async () => {
    const errorMessage = messageObject('error', 'message');
    expect(errorMessage).toStrictEqual({
      icon: <IconError />,
      content: 'message'
    });
  });

  test('Message Warning', async () => {
    const warningMessage = messageObject('warning', 'message');
    expect(warningMessage).toStrictEqual({
      icon: <IconWarning />,
      content: 'message'
    });
  });

  test('Message Info', async () => {
    const infoMessage = messageObject('info', 'message');
    expect(infoMessage).toStrictEqual({
      icon: <IconInfo />,
      content: 'message'
    });
  });

  test('Message Loading', async () => {
    const loadingMessage = messageObject('loading', 'message');
    expect(loadingMessage).toStrictEqual({
      icon: (
        <IconLoader width={24} height={24} color="var(--color-primary-700)" />
      ),
      content: 'message'
    });
  });

  test('Message Default', async () => {
    // @ts-ignore
    const defaultMessage = messageObject('bug', 'message');
    expect(defaultMessage).toStrictEqual({
      icon: <IconError />,
      content: 'message'
    });
  });

  test('Message with Key', async () => {
    const successMessage = messageObject('success', 'message', 'key');
    expect(successMessage).toStrictEqual({
      icon: <IconSuccess />,
      content: 'message',
      key: 'key',
      duration: 4
    });
  });

  test('Message with loading Key', async () => {
    const loadingMessage = messageObject('loading', 'message', 'key');
    expect(loadingMessage).toStrictEqual({
      icon: (
        <IconLoader width={24} height={24} color="var(--color-primary-700)" />
      ),
      content: 'message',
      key: 'key',
      duration: 200
    });
  });
});
