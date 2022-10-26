export const ironOptions = {
    cookieName: "some_random_ass_cookie",
    password: "long_ass_temporary_password_we will_change_this_later_must_be_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    ttl: 0,
    cookieOptions: {
      // maxAge: 0, // as long as possible
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === "production",
    },
  }