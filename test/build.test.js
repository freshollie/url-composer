import test from 'ava'
import url from '../dist/url-composer'

test('Should build a complete URL according to passed options', t => {
  const options = {
    host: 'https://github.com',
    path: '/:username',
    params: ['RasCarlito'],
    query: { a: 1, b: 2, c: 3 },
    hash: 'meh'
  }

  t.is(
    url.build(options),
    'https://github.com/RasCarlito?a=1&b=2&c=3#meh'
  )

  t.is(
    url.build({ host: 'https://google.com' }),
    'https://google.com'
  )

  t.is(
    url.build({ path: '/test' }),
    '/test'
  )

  t.is(
    url.build({ query: { a: 1, b: 2, c: 3 } }),
    '?a=1&b=2&c=3'
  )

  t.is(
    url.build({ hash: 'meh' }),
    '#meh'
  )

  t.is(url.build(), '')

  t.is(
    url.build({ path: '/users/:id(/edit/:section)', params: { id: 42 } }),
    '/users/42'
  )

  t.is(
    url.build({ path: '/users/:id(/edit/:section)', params: { id: 42, section: 'profile' } }),
    '/users/42/edit/profile'
  )

  t.is(
    url.build({ path: '/path/without/params', params: { some: 'params' } }),
    '/path/without/params'
  )

  t.is(
    url.build({
      path: '/path/with?existing=query',
      query: { adding: 'extra' }
    }),
    '/path/with?existing=query&adding=extra'
  )

  t.is(
    url.build({
      path: '/path/:control/param?existing=query',
      params: { control: 'with' },
      query: { adding: 'extra' }
    }),
    '/path/with/param?existing=query&adding=extra'
  )

  const trailingOptionalParamWithQuery = {
    path: '/path/with(/:control)?existing=query',
    query: { adding: 'extra' }
  }

  t.is(
    url.build(trailingOptionalParamWithQuery),
    '/path/with?existing=query&adding=extra'
  )

  trailingOptionalParamWithQuery.params = { control: 'param' }

  t.is(
    url.build(trailingOptionalParamWithQuery),
    '/path/with/param?existing=query&adding=extra'
  )
})
