import { memo } from 'react'

const Logo = () => {
  return (
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACACAYAAACx1FRUAAA7BUlEQVR4nOydB3hcxdX3z8zcu7vSqhdLsiRLLnLvjWZTjCkhYAi915BAXgg1kECAJKTwJZBAkjeEkJeEFnovxmBabMDYuOCCe5Mtq3dpy70zc75n7r1ry7ZsS9ZKssz8nmcRkrfM3vKfc86cOcc4tV+m7+SSnMFNnBNGCGh6DQQCBuO04cGvN26rsywgzh81Gk0MY/qg7MJbjh62xA5FTZMSCQBatXoBBOAEIAAILz+2est5dRbA/UcOHRpgrL9AtIk+L5rDCImISaZhfrqjbtNLG8pLKSFE/e1ArzNCkhMMRY3aUJQZlFAtWL0DegeeAjKOEnyMwo/HFd+VHDCvQIGcEDB6e4waTbzgEoWR6GMJizf96qUN5fcxAkwi8AO9zqBAgFAChvfQ9A67BMv7HQFqwzYIiWBLRKK9Q81hBJeI2QjQbHEBnQh97HPWluiYbXEboGZvDjRBxCYRBCDaJdQcZhBGCTDaucB5u4KldMrPCAQNQ0/r3YSaEJrtA1rAGo2mDXsJlkTAgEHJutqWa+eW1cwPGDQJEWTvDO/wRCKyoGk0nj0k908MyGkIIHp7TBpNX6AdwUJMNBhZXNO46iefr11jUMK4RH1DxQllACOCkZPo52cOzq1mbnBKG7IaTQfYZwyLEvCrn35GDUZQx0/ihBKsKJfMxygnQMzeHo9G05fYX9DdsaqiQnJtYcUP4llUlpCAgFLH0jWajkN7ewAajUbTUbRgaTSaPoMWLI1G02fQgqXRaPoMWrA0Gk2fQQuWRqPpM2jB0mg0fQYtWBqNps+gBUuj0fQZvnVF4QhArKTFfosVIoIQHaiAqNFoeo5vjWAZrkgx9KodwgEqJBAC1KSECQTRkdKtGo2m+zmsBcupj0cIkxJRSJQIwNP9JozJSk4dGwyO+F5J7ugWkCMZQD4SkoEI6DNgZVVN5L3fr97y35V1LRECTkFWiuiUsNJoNL3IYSlY1CnPqawjlIAog6aB0/LSs08vzjzp2Lys00ZlJh8lAAeQdr4/ApzECsjNZ4zMXf7Shoo/P/L11mdX1TVHKVG6hUr1tG5pNL3EYSVYyulTwqJcOGVUDUpPoj/Nz5h+9Ij8K4bnpJ8GKHMsgVgXtb2iCe0XvUcAYhAy9vujCv/voqF5//PEN9t+ctO8NR+BY205768LGmo0vcBhIVhOBJ0S6rh+iHJIamLi7RMGnXfh0Lwbk/zmxLDFSX3YUk8VSqjMXUH3fX1/RARRE7KJQcnE68cMnPud4ux/XTV35U8+K6+vM6grWtpH1Gh6lj4tWEp3GAHTdmNUfFh6MOXHY4svvqAk76Y0vzG8PsqhpjXKDUKkQQkDANbBtyaEgGEy5QQCr49YmJeYcPX7Z06d/s/Vpdfd9OnqjyghpklB2FJbWxpNT9FnBcu1coDaEu2h6UF227iBSqjuS/IbQ5ujHBuiXBqEEIORLn1HJVw+RsERJsSS/xld9P7AxOCd9y3Y8NDS+gZmUkK1aGk0PUOfSxxVvpzp1pkHgwK/aVzxpKUXTPvomlGFzwJASUPYdsSDkfg2hXXDY4D1EQ6nD+734HtnTv7HxKwUVNad6Tag1Wg03UyfutGoqxoGlyhGZyYnfnjmlN/9adqIz6JcHlsfsQUCIItv92ps81AQZdnVhC0e9LNr35k1+eXJ/VIDysIySef6q2k0ms7TZwSLOb33gQUMym8ZX3zEkvOP+Xxiv/Sf1kVskxCIxai68n2kQHTq13OJsVRRsvOxK8BOTEqMiBA8xWd+790zJr8wJSfVtBGRadHSaLqVPiFYyr0TiJDhN8UHZ06+/aFjR/23xRZjIlyINttsDgbpCBQ6vWNpksmMrIDJMgMmCRhUCVCrQUi5QUm18j/3GJMRtgVPMo0z3v/uxP87JsEHAhGp7iqh0XQbh3zQXblgXKK8ZHBhwu+PHvr39CR2eVVLVPgYEQRIR1f9dsPbJ0j9jNLURBPQ3auz9rOK+iXf1LV8neYz1j6zbsfWTY2hZtNgll/IxtemD/99en7WD2ybc0LcQD6jxGi2hZ3l919271HD5p3y0YrH0RVP3WVIo+kGDlnB8oLr1JIoLx3af8BTJ49+Kczl1FZL2D52cO4fIkiJSII+xgImw7rW6FePr654tXZL5bvPVjSu2WqJaItlO58d8wCVKAmJ/KnS2hV3F+VAjcXBaGND+ShhdTaH40YW3PmdDdv/M7u0vlW5hnrjtEYTfw5JwfIqKjBLorhkaP+xT5407s36CC+SiLZBHeumU24XAkgpkST5DOo3mbVwR/3Lb22r/NtL68u/WFsX2pmSQAlh3ibpnS81KGFKsOodq6ndfTlU/dkPZNDxhf2Gzy6tX0wJEKG38Gg0ceeQEyxlNklGfdlCWneNKjzp6hPGvNQStVOdwDrpXKdkRLCjUkKAMTPNz5oXVDY88cdlWx55Y3PlZiGdbtZKkBzB4d52nj2z17n7PDg6Ny2HC+luqN7jY5z/EiAhW+Z4f9BxLI2mGzikBIs4YkWMdCGtl0cUzDz6+NGv1EbtZAogSedcQGlLlD5KzNwkv9xY3/LCDz5a94vXN1eusSUSQoAalDh1Y/h+kj4911AkGgwm56SNjTqCtfdKYEyxAoxyiGfyl0aj2Y1DSrB8lBhRgfyekYUzjp4x+rWKKE8KIEggHRcrRBDKKkoPGEaDxb96eOmGOx5ZuuXjLS0WYYRQ5gqV5B0IMVEvFnVUXnp6ut882nLNr730yHEBpcTKcHQ7uAKm3UGNphs4ZASLUcKiEvm1Iwsm/fCEUS/URnhSgHRKrJzFPoMSIy1gtC6tbrr/+k9XPby4qjHKCGGMEqcmVmekxLPqxHH9M45P9hs51SFL7pnV7iSrEkJaLL7txfUVjmDpgLtG0z0cEoLFKKFCovjByMKix2aMfqUxwrOomxrQobQFdPOpICtgGrUR+6MHFmy57r6la9YjAlVWlXLrOltaQZlRHBH7BwNw5fD8y5qjHAxK9noTRJB+RunGptb5TRZvcsaMOq1Bo+kOel2wnBQAifLY/hnBv50w+pnaiF1EgXBCOjY2iSAYAZad4IvOL6u+76dfrH3ws4om4WPE4PLg67JTN1lVXjOiYHxhUuC0mojt5ITt/flIE30MPi6re7nFdkQNuK47o9F0C70qWMR1n0hWwIcPHjP8oaiQ0wDAJgQ6tBqoXMAEk7EwF2vuW7juygcWb/rSEpKZlDBLYLvF+TozLmVdXTuy8NZmLvyMkvYsPqmsw7AlVjy7dsdscAVUV27QaLqJXhUsSpwyxuLJk8ZeNiUn7YfVYUuYtEOpC8gRZVrAZKGo/dLZ7y7+wbwd9Q0mJYYSFlt2LYak3EiOKK4fVXhCYUrCJTVhq13rikvEjIAJz68p++vCyoaI+j4SUbuDGk030Wt7CQ3qrMCJH40dWHx8fuZD1WELTNqhzcMiKqRI8xn0g03V95z88sLz5+2ob05g1OQSueiiWBmEEI6IJ6UmJt49ouCBGotTgxLZzuqgY3FFhFjw0PLNT3p/09aVRtON9IqFRbyEzEEBH/504sD/RwCyGelQkF0oly8n6G99avX2q6+Yu/xFQpw2gzIsZJctG+IWeTf6A9iPHj/6rtakwFQasTnQvYoAoi2RZif6+U3/XXXnkurmqLdBWwuWRtON9IqFpVwnZY08MqHozMJg4PxWW0jvb/vDEat+Sf6Gp1eXzlJixQhhFEjc+gYyJUyI9k1Hlpw4uH/GHZGoDZTuPS5lGSaZjMwrq334iW+2/1e9VDem0Gi6nx4XLG9jsJiWl2aeMmnQz2ujzurbgV4mLYGsX9DX8OTa0u9cPnflR5QAk4BCxCnlyccoUy7lXWNLCu84YtgTNZybBtnbFUQAzggxfJQuuHne6ntbHAOM6HVBjaYH6HHBkoDOZ942ruQCKslkACdIvb9xSOV+9Qv6mv69puz0K+esXKDECh1DJz5jMiihlpBibGZy0o8mFv6nKWwNoEjaG5eUiEaA0epLP/j6qiXVjWHmtRWLz0g0Gs3+6FHBooQQRBBFSYnspMKMG5ptoSyu/b0EuUSaneCzn/ym9OKrPlj+GSFgxFmsCJeIYzKS2ezTpzyZmWBOs6UUShT3HIslkWQm+MR7pdVXPb9+xxr1HB230mh6jh4WLPfzzi3JmRnwkSO8pM59xq6UkGQm+ODZddtvufLDle8wN+WhI9sAO4TpidWojCQ258wpz6QlmGe3WEK5fHuJlS0R+yX4yJyt1T+49IOv33GEU2e0f1uQ3kO0+X9tVfcCPbZKSGJ5S34TbhxTdE2EI1BwYkTtCpZE5AGDGXWh0L9+vXDd/3pbXux4uoG2RDk6Izn4/llTnk7zmd9rtQU32l8RxOwEH31va9X/nD176RNhLgyihDM+Q+l2JDrHs8vv4zUBOSTGooZxAOu8K6C33YsyAsTH6G4Tu/pUdSHaAtUYhDcRd9tgunDMUI2PuN5C3Me3rx0d6F0rnT4/5MDTQI8JlpeMKX+QkzqgKMH/nWohwdzHxmZ1fighho24+vR3lt62piGiXi/j4Qd67eyZlCguz0zOun/WlNfSfea0FlvYxh5Jq+51gjQ7GMDZWyq+f/a7S/4vKqXBCOFx80m7GWXEJpoGBHysazYBAYjaAlotftCipQ6Z36AQ9BtdHovNJbREOcRbs5SLbxBCEwzG/CZTotRSG4puJIBVSCBMAHwSISPFNAalJfmzbFuwZi6c3arUPTBxHZE6fwmmAQmdOn+xISCxuDCiXIIlJDJ3cStu48tM9MGe1ZbQu8c6e60wNwcScB8LcN7e3p4TLO72Z5DHjys51zZIEuUoYB+pDEIiyQqY8Pfl225ZUNlYb7h9CLvkfqkDZ1KnRRgVEq0/TRsx7eaxxc80CVEU4kLsIVbSlmgTAH+Sj9U+v2HrJVfOWTUnKqSaNPqMWCm1TTIN8n5p9f+8taXqzSTTSDmYTHxKCGm2OT+5MCv5rEE5HzVaPI0RZyN4hy9+iSiDpkEXVTbc/8zasr8HTSPtIMcCrTaHSf3S+JUj8t9rsvgQ5q7mdim8IRG4JSTJSDBZyObbltU0vvDKhop3Kpr4khe3lDWZlHiWA4FWIWBGRnpgbF7KiKMK0k46MzfzYhEwxzVGbcmA8D0nvoMfE8ok06Afbqu56fXNla8kmUZqx44ZUaLht4TIO2dI7vgxGclnpvnNo2oitjQpEYx0qbmwU5vOlnLpPV+svbjJchoW01hJJUoIbbF5eFpexsjzS/JebrF5wv6uldgfUwnhX5w64VcJeRnfFzavJ220gUvk/RJ9Wb9cuP7+HhEsz9LjBT4DpmQGvxO2JdB9KCkiCr/J2PqG8Et/WbJpjjoGsgti5ZmmTCKQqJB8ZHoS3H/E0FtmDc75bY3FAwxhtxwwNU5bSJIWMP2UwFcXzF562aubKtco0SRxDPb3BAIBfAaFhVWN2/+xatv2gxX+2MJEoskSzh3an8soB9bJeVoioJ9RWNvQUvHYqm07DEoqD3IsTtLxWWELrx0zIHIwY9kTgejcxLkpCY0vrtn+wC8XrX90TX1ro7p0pVfqOuqOdKfpMre6LvJhdd3SP66ApScGfH+6c8yA750wecivbcSSVktwkxLW1cqz0jt/i6ud81dmUFLRmWNGAJY/unLbnPyg//c/mVD8nRvHD/xziyUHW0KIDuQ9tosSJiXaAjH0j1Xb1laHLSQECOJOwVJCSz4sq9tySlH2Z35KZkpX5Nr9vFhBzKMHZGUVDOx3ddTieSRg5rYVOCVYCX7TCBgsp0cEi3nbXS7sn16Y4adH1UjHtGtvRkQOwNIpEfctXPfgN60hZRWB3dnSMK5IOaXhlcDYEkV2wMALh/YfffuEwX8ckJJ4Um0oKp1yMa5bip5VhQSI0S85wD/aWvXgnZ+vveerqqaIk8UuUfQhrXKInfHYYofRxmUhbS6WA+EKlhBeieouWTLU7ci921gAdp6vA+KYuFIQk7abdtJphEQeMKgR4uKzK95bdsVz63dstKV0IgfKhTIIoHQ/p+1nKXdBXQ+UI5KPwhb/cOGGF6dvq333j9NH/HlCdupVtWFb+JljeXTZBYuJS2fOn9dakwhEsq0lgj+et+bdj7ZXf/nbo0e9MSApcExUYHsr4Z2BeC32UI2r7URuUmpsbGi1/7N2+zM3jxs406t0sq/3ccYwozDzDB+Q/CaB3KDO33a+o5osQUonrt0zLiFxGjUInpF0FPjNILZGJbSzmRgBpEkpq2uJvv3BlsqF6pViPyWM9/4Y56Q61pS6EBFAZAcDeFVasPi6Y4fdNDAr7YdNUZ5QE4oKr/EqKldAnVR18tL9JgjJP735k5V3/vOb7V+22oL25S03sTMesxK4WxK6zaXVMXtRoHtjeLN7l3Q79vF7joV3cCzehU86O4ntYyzCb1DD4uKNs99ZfNH8ioawSYmzzdXbuWDYiMRbDd7zGqDehnjuXMiUsHnl9a2nvrno6ndPn1w6sV/afQ1RO3addXWcnT1/xNkFQkCq+06dPXVfvb65tjbBXH/BMyeN/zTM7cG0i650bN+u13h451iQgFMp5eOy+reuGzewnBLI847f7p9FAMJciCQ/hQtK8i5tsjiw9uOAsd+75Mt2mFgjhzMKM8dHndyrdgYfi10lmPDY2rL/rHRztJRYdMptUNZUbqIfStISM8ZlJU/5yYTBFw5ITji7xRYpNSELGSHcnaVRuYI0YFCWaDASssSXz20o+/1flm16Y1FVizKZlVjh4VY9NLYQk+Y36MTs1ICyEA5kAijrpy5q80GpiUkg9xUWPfixqOM/NSc1oSPWiDp3jZYNIzOSOAp50GNRk6NBKbO4+Pysd5c4YuVz28pxSpxYMlWuyLisFJJmskEXpQUHlgwvSJlfVhuZva16m9+GdfNrGixlZSEhKN1qt6Q2YrPT3v7qF7PPmJI5Livlhmabi3bSZA6a2DFL9RlkUr/UhD3Pn9INP2HRlTUtvDwSie0sQUtI4WPUeG5dednMgqxfXD2i4OmaqO0EuuNNLF3p/c2VdRXba17L7p/5I8vmkpA9jBRCoNkSoTMG9hvQLznh+OrmKOxZ0XdPul2wYo0c/IzCwNTgUC6lGxLcG6SU0KgtquZtqpnr/a1Dlg1zfWo4MicZHpo24qeMmjOm5qSURAUWhWxBylsdi8qiBEwgYJiUYppBlZtav7qu6f2FZa1P/GPN1k8WVTdYypt0Wnu100HncCBWmHBCVmrhh+ce9XokaqcqET9QAJ24ibOsPmqnGHFabSJOIjFiQVIg+cOzjnhDIA4CgEhHZn01qzdYvMgbS2etBJSINM1nND780fJr55XXh32MMnVTqysTnVuJyD9OH37SVSMK7kgy2RFCQjIhgNPz0sjPpgyOYhRXza2s+9sPP1n51PbmsO2EPSSiSYmsjdjk1/PW3/HSrIlTCSFT27UuDpLY+Rudmdz/w3OOfDNi8fS25w8B0QTGNzSGl/114eoHnlpfsbzBO9Cx+Neflm997aySvA0mIUNk5xu87B/vhmeUYEQivLC1+rk7BmT/KGyBYbjrFruuG4mQFjCss9LzLhCWpMy1zIzYYmN7b99Tq4TqAgFLyHyyj2QLZ8YjwFqE+OL9mvo6N+DZMevGexKpjQoclZ1+UkqCf0ZDc1jNKCQ9wVmwUTMc4xx5VIr1W5paF31YVvf+KxsqPl5V17yjNuI0T1UmvpNFz+ORKHSIwxF90Qgf3Gjx5I6u+MUjD6s9JCJrjPKBAnFAR2/uruRhqRs+xWewLyrq/nj7xopvGCGmJaQdCxhP6Z8s/3HCmAfGpKbe2WxzqItw5SK0dYd9QGDCyQOy/rn4vCPP/vXC1Zf8ZWVFAyVEuapKtNibFdXhh1dsufuOyYM/qAlZxCuvHbeDxyWakahz/lL3PH8IHHOSzRGPnDz+VKTLZ/5l7Y4l1N1C5ri51fUtraKm+VOjX8oQsIWEPS2fruAdoVgxgEc3VX52zaTBn5uUHt02+K781SbbhnMG9M8LBuiMFs53xjf3d5x6NHGUAiTgPgakZlq/wWBpedOK+rDjAjO32suBUfqiLrZ1DSGY+eqXl15UkvvDc0ryCjbVtor5ZfUNAYNuNyjdVFkbXvtMafmOqJSh6rDtvJYScJunut12DrpKaV+DuMFSriwURpwAdkdvpri5N21wxuJVzO9MnOxgEjadZGUKUPnHZZsfV1a0mtmJew06bTF/PrHkrvGZ6XdWtES4n9KYm9L2eyvPS9SFLZni95/208kjnnx1c/2ZZa1Rxz/zLBn61xVb514yrP/7yT7zZGWx72ul7GDY//kjYNmSNyNJv3bS4Nuf2FR5castiNegGCqFhJd31K2/vn861FiCGHGcg36UnZL6eG1zk1dE09jaFOarahueO6Z/v6OVKx+bZNSxEBIwNUhnCITRGOuV59IMAEntndueq4flFq5q9n7b64KUCFQJ1vzq2k0cpNPwoTO10Z0MT0JgcXVjxaKqhl/8bskmiAihfOS9RkIJ8QcYRXURCVeouvjl+ixtZ7TebqdIDmIsnR6zl5sGK+ta33xtU1W5c+OgE3+iXKK8eXzxlFnFufeWN0dEgkH3XB3c9bkEDB+j0BS1o9kJgVmPHj/q+lnvLHmUAHGqiKhJcFtLBF7bUvncDWOKT/asrM4O90CwNj93e3P1+RbnMDwjuWhMdios2FEn1f1BvHuviZIG2F0kujYQL1Z2+tHDvrtq0Yb3Pt1RX6fcY1siPLhs2+tH5WX/mgCk7ubuIUQ4QiMQCBBvBYERp8LAK0jIhQQgsOfndPteQk8KmJAIDRG+mJJ99u2LBSOqDvazpLNUgU57+eqwxVptoawnQ/2uTqCn7so9jUaEtGyJXS1Q2mdRh4MxavgZBT+jtCMPdVN3x9EihKj3NzszFvMgx4IAxCQE3thY+aaap7yb2NlmkuHzwU1jim9psbkzoXXk/vAxairX5rSinFuOyEkLSjeni6BX2//tTVWzQzZvZq67E+/Dh21+7vaQiLaPMVhb01T3TXUjOPmM2KavJmJgp2zEB+dYJRI67eSi7BNhVwd0Nn9H/fYdLZHX1fmNrbiqoZgMlpkUvvJeLygACQu5VVTbLzCEQHsD6xELK9ZJ5qXNFXN/lzv8phY7yui+4ybRrnyWOhDcW1mM1761wwzngIRsXr+uvukfzRZPpAd2CdXsGc3w+4ZkJ/i/yxGRxGVmds+NJWRkdX3zkxIxBwDsA41F3YzJppGTG0w4V2CnVi1RWfKUkcZvGpq/AdfwRy9gLi8Y1D+3ODXptOpw2EkD6OB7Om4kJVByUmHGtC8rG9xkZ3BjOF/XNFe32mKVn9EjBe47gbKzoLf6ru4rJLtbpd4V788I+mHZlpp/NnlVUdS9oJ7vowSO7JdaHOUSvAT+uBES0rx2ZMHFDy7Z9FJ9lDt5lA2WDY9/s/3Z+48suSIibEYQZNAw4MvauleTmcFHpKVAK+cixTSM5TVNb5Vubd50SX4R1Fg2GnvkmvWIYMU6ybxXWvXuzyYOWswImeTFEnZfkQVQKpbWE2P6thJL01hY1Vg17Jl5t3bkNbEM+etHDzjlbyeM+W51yFl+7nIQOZYftrU5HBr//Gf3dOQ1sby404qyx7xzxpQza8KWvxMBbUecwraoq4tY28Cd4JC4ibUCTTEeqEx1L8NO4Tx/Sk76kQCgBAs8F4eZlIoANTcLFEeSOFpYyggIBHzgxbB2GwglYEUFlr6yuuzemz5d8YYn8sLLSOdD04K+Sf3Spoe5aBvojgsRLlqzkxOvHJeVkvdJWV05epbXs+vLPr1z0qAljJCJapLxUSL+sqT0P9ePHnCZkeFcl9Q0GLyztfLZAbbPUdJ2v3c8B7svvPgSW1bVLN7aVPngJSMKn6sORdFsMyhKQIYl0lMSfWN+DfByGN3cB20fdSsdvVipFwzvzuulM2OR3lg6JZjS2QjOYFVtS+MH22qdVRcl4LFZHCX0h12B/05/1zAXRbs+y7He6LaWsHh/a3XDWSXZ0OBsI+pqtQvXcvumrqXi9NcWzLQRzbZCiO4m4nCDxdd/Xl4fjiUauPEhp6sTv2HsgFOSTDapJmJje92guoilhnDzuOKzPymr+1/p5okZW5vC1vwdtS+cVJg9sZULUh6xPv6yon7HzeOKE50tSJSadeHo8ke/3r7gT0OHjN/Xjd9jQXf0TOR7F254fnJO2kUDkgKzwkLu3NNECSERi8OIkrxTR6/c9qtFVY08lqfTU2P8FtJtwe2DoCfHYrd5rzbXl7tp+WA/QBk9bX9nhCBHhO2hkM0IdVWji6OPDbY+akff2Vq9eH/P9SxHqV6krGRbIh+dmZR8YUn/+xvdrPK4plqAt5dQWAJOLMy6aHBq4qMbG0PCS8iF+Uu3vHBaYfZdQZOl/ndl6ZPbWqOQaFCqjlGiwWBBZf2zTVEOfkb3qUs9VsBPmd5KzTc1heChZZtuDviNHdL152PJoU6p4YBhTP3x+OKTenp831JEJx7Q5kY/FMbCO2uAEyDAJUBWwAgWJjnatFuaOAK27HzqQSARGqHNG3CJkOnzwZkD8hKa7a5bV22JbUPb14O5+/ucEK5yBW2JojglIfDqdyY+aVA2zkuz6I77iyqF9FF6zPlDco+BXcF3+o/apq3f1LfOMymt/9fmyne8fxPesWr809Itr4ArerLXLSxwByVNStjjq7ZvPiHgu/aio4a/WRW2mM9TekaIbLQ4mTUw5+4p2anvL6puFF4yX08O87BGWbJqYpiSk5r+zMzxV7dEpZ+SveKJe71MIIbTA8bYpl1NQ+KwqdethlCUEgi8cdrkq1GQDE+IDhR0t5J8bECTxQ3WiZA7cfeuQVFaMGVaflbyc2vLm71N186k6Wd0AxAiEHZuvu3wm6snBwy6cteHOX+UAZNAehLt52ybiKMtg7v2du6EtlkmjH1fRCA5CX68dULxtCtGFDycZBiTQlzEdbvQnlAg0CI43Dhy0KWPr9g+r8Zye47WRmxY3dT4IjPojtcrGurB23zuYxQ2N4ff+qSsdiO02TvZHj3el9A7yMZty7e+O7Ik97YxWWkP14Ut6fnSFBGlzzCm/Xtc0e1j5y7/vQR0y7r09EAPU7zVPUwyjJyhGUm/bLHsYEcz3QWiUzkjPiuEsPOu9lMWHJme9DMbsYB0MNPd2TnhjgU64046T5TQT3IcDADLEHe5hctrm5eHbb6FETK4E4Klbi+nN+ayqvrPYn/zXisZJQm2wKEmI0o84mbRUHdD827vJxDdIpe4Ky9qel566tyzpr5MKZ3RanHobrEC7yBbAiEtSGdNzE3+2fultXWxc/qvhZtmn5yeHtt6BxyBMYPBa2vKnmuw3LztfaQ9ud+7OwfeHt6Z5OW2YDPfWPTIkoq6O1N8BosIaTu5GITQ1ogNJSMKfvf3GaNnAoLwMerbnzWtTG2DEqJETz26sXTuYYNA5EJIKyokRIUUHXkoC7k7jqxEFBEho1YnxqJcnIMYC6EEuI3o+1H/9CPAc1fUjU0IsE/L6sJvbqz8Z5KPAceO7XpQLo3JKKxvaHn7ryu2L4ulNMTK5VwzsnBoVqJ/hC3iI/RePhdMyk7Nr7j6xKXrLj1uy/pLjltX/v2Tyl6cPPhMNfUQpxaXY6XQzU0tDZsamze0WkJZs+31K+gWENEyTSP3ZwNzzgU3luB89/dqWmpuW7+tPJb0SilJgIhdNndl6ZwObQ/rgbHvhVe5UdSEbXra20t+v6Km6Se5iX6fLVEdb8EowaZWi35/zIB/Pzoid0RUSMug1IzpkHJJPF/dUA9lhXmlN6R6SECjG1Y/DkfaZkp35NGdx7SzYzmoG48AIcotHDY4/3sjgkF3Bdv9u+MW/nnF1scQYTUg+CTigWJ2IsIlS/Ub1r9Wb/tdTcTdeuLkAkp0KiYflZcxy3LznQ64wbwzGJSYaX6jKNVvFKYnmMUMMPesCYPuOXVAlg8dMXcSpXF7qw03zlt7X6JBt0lAs6MFBbqKOg6tUQ5jinMvKk5KULOSM8Gogck2uVUpBvPPrah78f1QVJgdqNTaaze1t/9PVkcsdvo7Xz34YWn5ZcmmEUJEpmZ/xohoDPP8c48c+cYvJg4dAYA2AWJ6ZY6Jci2V/8sl8rzEgBidmWwOTwumjs5MCuYm+dTfQYvWvonFQDyh5x15yA5aHYcyhABVApKT5Jv548I0Jx+QUre3pLKyPi+vr3981fZrspL8DYQQ0xbIhfu9d3bMUZaK7R4TmpccIF+V19z6z1WlC2IdwD3rip+bn500My/j0mabxz3fCRFiE7STQGoLybnBJt04YeA14N5fVFmOyqKau6228tMdtb9K9Zk9VzKXALWFhMzUhOPOHdp/Krj7GKmTLtAmRpVosKovtje/AK7IHVBMezyG1RYlWoSAqA7bbOabS5+5cWzR6j8fO/JfzZYYE+ZOBxuLGqzkvuklH+en+q+49uMVcyQCGZ2ZZKT7zEHXjCycAABTp+akDRuUmpgT4TzJxyipDEfm/e+CLb94cG3p9r5cgK87MQih/oBhphIkXo3vA5WXcWJGyoXs4w43YZSIxihn500b+rOHKuvO3VAfJl6JIickceN/V37RZFkn/HB04f9lJvgmRoTE2OZhdIPzJNU0iMVl+WsbK2++/uMVL1ZHRKzKEcQ27t84eeB1NuBQr9JDd7hiO/dfquu8KWrDif0z7zxlQPYrc0qrq5RwSrdRMVw5d8U/F5xz1IXJfvNE9bd4bsTe19iUVRm1hXFKYfrFDy2FhbG6eB7OgtqquqYPH1u7eQW0SWreH70qWBDrp0TcA/jX5VsXL6xsPObvx4/+5fi8tBtawpbPElLUtERzrh5Z8FZJauIDNRFLnFSUdWaSYQwHgAQKgK1ckBAXzrJ1hKPM8geG/uGUMScE08xTf/nlxvUUyM6tEt92YgHN2ohV+8Gmqj+02DzhQFtzPLGSg1ITAsPTk/4nymUC2bO2UR9CXWscpUz1B865f8qwKy9+/+t/S0DDrevods25e8G6ZXO+2Xb0nWMHnJ+Ul3nesdmpgyzEoI9Sa319c9mC6sb3Hl+1/Yl5O+pqlNUWEytvVwC/cVzRmCP6p9/jVNGMs3W1D5zqp4RA0c3jim6eU1p9l1NcEMEJspe1RsRT67b9/K4jhp1Q3RxlJot/DtZeAyKEtdgcTizIOmdWUb9739hS1cS8VWr14YNTAokLqhqDZS3RsLf/8tAXLNhV6NUpJ/tlZUNoxutf3nrO4Nxnbp9Q/PP8pIQzbYmyLmLTI3LT7jEoAXUR1HJbybXjolDninHdW3UjWVJata3RQXdMGvz865uqjv+6urk5tpzfy1+114kdg+W1zbUnv7nwVx15TawJxU3jihMePm7Ula12NMHs4wsb6gZpiNhw4dC8RwSHdZd/9PXnSNBp4caVaFFC5zdH7P/OX/t0is94ekR6UoBLJVgkuq0l3LK9NerkN8WKPapbzaTEUK7idWOLsh8+duRTDWE7JR4dfTrxnZi6N47Pz7zh+lH5/350Vdk6rw6WY+E9+PWWBTMKsh8bn5V6fYhzebCNKDqBU16aACk4Nj/j9De2VP0H3Fr5jjs7oyBr5Kj0ZOWWf0zcMuoHvD8PmRgP9fxydU+1cA61IWuDIY1FTqo/OsX1SKsteEOUc0KIMN3AuxN0V/8LuxoFMEqIjxCwQZCJ/5459leUODdqH7/F4ouzX8I7fh15OCY+Bf+hdM10EXXhyKqwlXLJyPw3njl5wrHg1vdnjO4sdodKhFptYXxZ2RBZXN1Y+0VlQ8uOUJS5151T/N1xIwlxGvPyG8cMKPjbtBHv1oft8QTi0yijM99JWVkCIPmeKUPuyE30Odc9ePGh+jCH33618TcBg2yH3ZO2uw1GCTTaHC4fVnDZ8JRkJ/UCvGyUC0v6nxfiIr/N2A/IIXHxOYXnvVjTlH6paUsvnP6bV2dNKs1L9f3WFuj3lEYps3PzkHbq/+wJJcRo5QLHZ6beeMXwgqleTswh8X17itgBinVHaStAXexNd9C06ZoTE0KICWJvDMdHqawKR7IuGpbz3mvfnXDruOxkp/GJk86Ezqo1UuKU+KYBr7QNo1R6xqqTRSCczuCmfODooaf/cfrIzxtsMZnCzo7LXR/krq45O48Z27tD+c7nhmwBOcHgFT8YVaiue+FjVN1DzEdp4N3S6rL3Sqt+G4cAPPHGwNqOS1lKbd+VAFBLSMgK+o+fXpAx3umMhUin5qTS4wf2u7jFFtaeb6wOvpAS2i74oESniEKv3sDEaQnkzFIwKCVBPjFj7AUfnDV1aXFS4K6KlmhyhEurC2YRYQREiAt2w5iiG2Mlbr5NVlabrjkR8Pq7HezDK80S7eqsLBF3G4v3/1ZHq8t2A0q0RGWrZZxS2O+h+Wcf9cXTJ407e2xWkp9Sp9u4sCViVEgZEVKqn7ZwlkylEqWcRB/86oiSI5ecf8wrt08Y9FZ9lOd7saSuitXOGFN7x0xIjLbZptQWZfqJVpsbVw4vuDsv6IeokJZA5LYzfIQL3/v60U1NobeV+Hr1qQ4GdRic3Mm240IEa497jCg3O8J54JKhOed5B8U+sSBzOhBSIBFbdz3T/WGaJrCkgBI5Qz0yg35GkgKQ6GOBXothMadbLDqdSa4dXVB87+SSRwtSEk9tCFtoIUo1mzm1s7tAbLaZmJN62gVDcvOeXVdezrx4TPy+yaELIwBRLuDY/hnX3jVp8DFB0/AfTBzP67Ysj+mfHrBskXQwjUspARrmAsZkppx/9+QhAxINFkA3c15kJfgSJGC299TemFOYn1HWyp3W3pMuHp7/yjlDcrdvaQjNeWljxReUkjUSsCJg8bBFDB8xSVaYi8HH98+cfGRe2imJfmNMKMqhPsKVC0niFBsmlABGuIBj8jKuvmvS4Knq/CE4K7W8KDkhPSowibZzuJQHYksJeckJp//hmBFPrqlrKQsY1IfolNehzTZvrQhFsTApAJZTyqsT25vc3ShgUDrkzomDH2y1OboOEpAol5HBqYknRoQECru8Gec+lAhHpwZ/8OwRQ80lEu2rh/c/AdTz2lgksXJDz5SW7Vgyt/mnISG5u30LZdBkifN31H/UK4Ll7N5GIMMNyn8zueTis6eW/KU5bGXUtDrNTUmcN2Wqg5BBCBkJAOVtSqV0GKf8CAHW12q+q0MZsiVM659+1syirLO6VKtHiZ8tocUWsYusU8LiVOPgEkZlJp84NS/txLZjUa5Jc5S3+aTeIVYVtD5sKeEqKEpNvObeI0qu8f5ZAnp7Lj3rydklwAXUt1rIKIl7qRbq1O6ScGRe2qwTBmTOanvMlLfQbHHYVSJ9r9dCyOLkvCG5l/sMutdmFzWRh52E1k77MMQrVdP/1gkDb9vz1S0WhyiXQHZXQUIlQovfzDp76pCfXAAAdWGbg9j9ebHJ9N2q2qp3q2r/X3sf3uOCZVLCLIliWHrQ9+4Zk/4yMCV4fU1LRCm/PMgTvt/lWXQvMMtHSVOb53cY5rqsTuGzgxhbr6MuqJAtRYvV9e2YXtecg75miGPxSRm2xV5upddw9FDw2ImX+Om4gSHbSdCm3p5e9/p0j6SyLJzuyfto/hmfwRCAsC1F6x7nj7jX5n6PmRKj5ijn2E4NX2eVoGtuK9aG926YwJwFiPYNDoKITSErdvL3GZ9Rx789l1oiyJ7tmkOcmjzittGD826dXPxseoJxQlXY5j73wHdGrGKNI5xa7c5eMHAunt2aBiCA9FHKypsiX83dXrsIvA2iHf0Q9X5CojwqOyP1kpF5p935+ZpXWm0R7WuFBSmJNdTtfdQxjXfWdzdBvB6V7fzLzv/2yP3TlfO3r+B8HCBG59/bCdSzWBGEfdxEwu0j3a6B0CMXDnE3OTr5Kr+cMmT4gycO+yTZx04I2UKJVUdXiFC423GcBjwZAZNlBkzwM9qS5jNkgFEDwRGY2JYFEeGSpiaa8l/rtt1d2ux0wWUdjeB4Le/llSMKUz4/7+hXLxre/w/Grs3xh8bdr9F8y+iRGYIQwpTY/HrK0PF3HzFkdnVzNJdRp2V8Rz5fCkQn6SUjwWQSMdwYEZ+/sKX8wwbLnv/X5Vs3zszPGHnz5OJLc/2B40yfUaxmRYlIqGGQ/26tvOH3SzZ94hUIPGDsKmZqK8H7/oj8osdOGPmKBXzS6qrGe5uidtTLXznYlRWNRtMFul2wvL184hdHlpTcPXXI29WtVq7BKCcH/mz0Nm+SNL9Jwlysf2VDxb/eK6184Z0ttZtqI1asNhN8U9ey44VN5XMDlAUvHlpQMiDZP8oWmCsAlj2weOOHjZGO1QFsK1bXjCw48vEZY56vDttFSYax8ZHl2/7mBRtlj20g1Wg0u9GtguUVEZPnpCel3jd24PNVYTvfJKQjYiU5AElP8NGoEGteXL/jgd8v2fzS1zVNoVjnaK+8DMSC7lUhGxHt1t8t3rAMAJbF3ogSQikh8kBq5Y2VBk0mnj51zIWn5Of8sypkJfYLBuB/v95890sby2tj3WPicWw0Gk3n6TbBIsRt3TMkNUE8cPrkR+oBJhqIFiFk37lVCNxGiQGDmWkStz3zzfbf/GH5lqeWVzeFlfb4GfUjgJBuWZTdgnKMECAUqLc0HQs2oe2WRdnnRyrTy6TEZwlp5wcD9PlTxv9uWl7GT8pDkUiq3yCLKuv+/rMv1r5AiNMMVouVRtOLdJtgUSBMAIofjy0+e0ha4hU1IQsNum+xkohCEMJSTVN+09D62J8/XP7zp6oaa4S7JcfZ2xUVcp9NVr3SsJJ3oipDrCxzVEjryuEFBX+ZPvJJwsiM2ogV9RksAIQsuH/x+lua3UaUcp/LGhqNpkfoFsGixCk7K0rSgoGLhvW/pzFq77elkJTICaNGNuDWvy/fct31n615z1sCZRTdlcF4Eus4YkuErIDJfzl1yOlXjBzwOCLmRrmwBQF/P0qqrpqz7Mq3NtVEDEIo1zW1NJpep1sEy3HOAMUNo4vOzfL7x9dELOElBu6FQOR+gxrNQn5w0dtfXfFqRUM5EMIMcFMT4j025iYBOT3azi3KT/zFkYN/Oyo7eFNtxEZGiHI1jeyg335zeenlz22qXAuUaFdQozlEiLtgeZXM5JDUIFw8PP/yRsuxrtp9rhKrAKMGF/DCee8svvyzigZLCRuRKOKdVk7c9AqqrLUgo/zREflHXHjc6Ed9BCZUhWzhY4RwRNIv6CezN1f++Pz5q+ZEAZyxaEdQozk0iLtgefsAZVaCOTDNx6Y27qPiokQUCYwaYS6fmfX24ss/r6wnXofYbrGqEN08rDMH5Cb/4ehh9w7KDNzUEBVmBJD7GWE2okz1Mfb2xopfnjNn2d+5QIOC03dTo9EcInSHS+iYU8Ml5iBiant95hBRMEZZkxBzzn5n8dVfVDaASYlThjeeA/FqWjv1jXyUin/OHHvquYNz/0QIGV4b5sJkRBAghuOWmszABv6P+99f/gtLSGq4lSfjORyNRtNFukOwnLu8npB6SkgEAQJ7bFCWnBKWjbDxxreXXPlFRYPtWVZxEyvmJl45ewyDPiavHlYw4obRA+4fkpl8dmPEVn/nPuZuHFVWl8moARJeOP2T5dcv5DxWwjVew9FoNHEi7oIVa3JQKuRaIWEVJWSSV/SNednrNMMw4OmVpbc+XVFfYTBqWEJ2OWRFYpUV0LGoMNFg8sqSwoLrJuXfOio19fsttp1cE47aJqE7N226YsUYJXL2ubOXXP3BjhqnnpH9LamXpdH0NeIuWE5jSkLY0pom8cqWyhfOGZQ7qdna2WBSGoyx1tbwKw99vuZNZ39fF8TKIE4vXeaVqXV67KX6DLxqVMHwG8cNuHlQUsplYW4n1kWcHDDlFsYaNaKQyE1GTYLyze++/dV5n5bVWwZxxEqHrTSaQ5RuSmtwy+j+e+nm/1xUnPMTCZDNAJzEyzSDwcMbyl7+WkjwM+rjiNED7/LbBdtV4C9We1sAozAtye87b1Du8TPHFf1gZFrw9JAl/DWRCBq76mzFXFK0BfKASU0K8PIZb311yac76i3jW1SJVKPpq3SLYDmVA4nTsqts/pbKv00enHtfKGpLJTS2lFCUmnJscXLg+S3NkQghTkecWI4W7vETYhkJsV+Em2YgTEJgcDABZg7MHvrd4uxzZ+RnXJxoGKNCUmJtyCKUEqe/3B7JqlJZUGkBw4xE4R/fnb3oh5/uqCdarDSavkG3CBa6ASvZCAB3Ltn0yCfF/S5EgGGMENlic/zuwH7XH5+fPuyJ1WX3/X1l6ecbG0O8I0XxlGk1ODXRPG5A2pBZhbkzpmelz0pKNo+hCMEmW0BrxFYihaydgoCoxEpI0i8YMN7YUPGbn81f//PVzU1Ox18tVhpN36Db9hLG+vp/XtVY//aaylu+N6b/uzUhi5iUQIvFpUHojNsnDjr+8mH5X39eUf9RAoNFT3yzvbQyzJtMAiEEQEIIjUqZMjApIfuSYfnDIlJOnt4/Y1K6zxgqAXzNNndqgUt0mrCq9263IKF0mjkC65ecEH5xTdl1l7y/7CmOyLxSMVqsNJo+QreWl4l1nL3ssxWzX0/1PXhs/4zbmyzubNORAKI6ZIGP0QmnF/eboFRjRkE/BAIhQAw7b+C6dEEAp4GnQ7MloDridn023B7hbD+1qVEgigCjRpTLdb/9ct0Vv/lq4wIBbodfXddKo+lbdKtgxQretdoCfrVo/d0fnDl1io/R47iUQgmNsrYQQTREeUw5XIEijki19RFF7DemLClXyA5YU8tGgGTTMFpt+6VLP/j6h++V1tSbbkqDFiuNpg/S7TXdlctlUELn7ai3zp299HJGyUZCKUOvXDEhuzrHKrfOcIPl0lvdUw/0ivV1tOszKstOuZPZfqPlnU2V15U889/z52yraTApYRxRJ7BrNH2UHmlCwSVKZdm8vaWq9LLZS85KJ1AmiNOUYs821btaKu16dKhBBQJwS0jLlghBg7E6255zz+wlU6+as/Sx+ig3lVVmS9SGlUbTh+mxdku2RA6U0Nlbq1feNnvJKQYjG32UOpU+8eCbOjiVR22JCpYe8PnSAsbWt7dUXT7umXmn/npT5dpW5T4i2t2xqVqj0fQsPdsfTqLklNA/ltasOv+dJdMIgXeyE3wmIlDbLXnMvW087YFurT/gXi9/IRBZis8wsgImTWBs1Zuby68/7tUFY859b+nTLZxT5rW57tHvqNFouo0e7/zsuIeE0A+21VQc9fIXs24bX3Tt2YP6/zzVbxQ0Rm0nK5S0CbK3gSEA9TFCUwx32GEhti+qavj4nS1VL8wtrZu7qLoh6pa9AgoIUptUGs3hRY8LlsJGlJQAWVXbDFd9uPKxP39d+uotE4ov+d6gnAsCjI0hAMG2nW6VcnFEy0fojk1Noc2fN9QvWFRZP/+trdULl1U318QqKxC3Q64QOhFUozks6RXBAjeZEykhyAgYy2qaai7/YPnDY7OS/4oIhcflZww4IT8zu8XiLGBSe0c9r/r3hq01QZNVlLdGGzY3hyGWGe+tHiKi03BV6Ki6RnP40muCBW5iqRIu7m1oNlbUNCtbafOK2ubNf12+td3XUDcNImZ+7dXuS6PRHL70qmDF8Fw4JVyxEsvtLQagm2PliFQvjFKj0fQ2h4RgxfDaecn9rBRqNJpvMT2b1qDRaDRdQAuWRqPpM2jB0mg0fQYtWBqNps+gBUuj0fQZtGBpNJo+gxYsjUbTZ9CCpdFo+gz7SxyNNR31wcHXq9K0DwOAsPdTo9F0kL0EixAARIQEg7YmGgZkBUyLoy5+Fy/U8bWENHIT/UCARHt7PBpNX2IvwWKEkEaLw6nFOb/ZemVOuWdp6c178YUAgGUQmI7uLxT1diSN5oC05xI6lRAowIm0I9XUNfGA6v2TGs2B2V8MS7uB3U9Hm2xoNJo2giXbPPQN1HO0taqEdz60paXR7APDKUHl9v2jXmE8LVi9gNOa3z34LHYCuETJJaqfXJ8UzeGE00RGIhOyc01iDGGRJh7lT7VaXImWDq73HhIIJBmCzkNJnNXEzATTSA6YgAINQg6t2mUaTVdQEzFL9EGyz0iATlhJJNUwITnAQCBq0+oQgCKBHaEoMRjBOyYMuiDBYNMFYivRSb6awwiJKJNMI3Feed2br2+q/IASQjvSku//BwAA//+ZuEi2xnaIdwAAAABJRU5ErkJggg=='
      alt='logo'
    />
  )
}

export default memo(Logo)
