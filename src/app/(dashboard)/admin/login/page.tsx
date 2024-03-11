"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react'

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    signIn('credentials', { email: username, password: password, callbackUrl: '/admin/dash' })

  };

  return (
    <section className="bg-primary p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h3>Log in</h3>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name"
                          required
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                        <label className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label">password</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-2xl btn-primary"
                          type="submit"
                        >
                          Log in now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
