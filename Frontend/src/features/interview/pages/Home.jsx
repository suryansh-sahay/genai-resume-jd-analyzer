import { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const MAX_JOB_DESCRIPTION_LENGTH = 4000

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ formError, setFormError ] = useState("")
    const [ resumeFile, setResumeFile ] = useState(null)
    const resumeInputRef = useRef()
    const jobDescriptionLength = jobDescription.length

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        if (!jobDescription.trim()) {
            setFormError("Please enter the target job description.")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            setFormError("Please upload a resume or add a self-description.")
            return
        }

        setFormError("")
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })

        if (data?._id) {
            navigate(`/interview/${data._id}`)
        } else {
            setFormError("We couldn't generate your interview plan. Please try again.")
        }
    }

    const handleResumeChange = (event) => {
        const file = event.target.files?.[ 0 ] || null
        setResumeFile(file)
        setFormError("")
    }

    const clearResume = () => {
        setResumeFile(null)
        setFormError("")
        if (resumeInputRef.current) {
            resumeInputRef.current.value = ""
        }
    }

    const formatFileSize = (bytes) => {
        if (bytes < 1024 * 1024) {
            return `${Math.max(1, Math.round(bytes / 1024))} KB`
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loader-content'>
                    <div className='loader' />
                    <h1>Loading your interview plan...</h1>
                </div>
            </main>
        )
    }

    return (
        <div className='home-page'>

            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => {
                                setJobDescription(e.target.value)
                                setFormError("")
                            }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={MAX_JOB_DESCRIPTION_LENGTH}
                            aria-describedby='job-description-counter'
                        />
                        <div
                            id='job-description-counter'
                            className={`char-counter ${jobDescriptionLength === MAX_JOB_DESCRIPTION_LENGTH ? 'char-counter--limit' : ''}`}
                            aria-live='polite'
                            aria-label={`${jobDescriptionLength} of ${MAX_JOB_DESCRIPTION_LENGTH} characters used`}
                        >
                            {jobDescriptionLength.toLocaleString()} / {MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()}
                        </div>
                    </div>

                    <div className='panel-divider' />

                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className={`dropzone ${resumeFile ? 'dropzone--selected' : ''}`} htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    {resumeFile ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><polyline points="9 15 11 17 15 13" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    )}
                                </span>
                                {resumeFile ? (
                                    <>
                                        <p className='dropzone__title'>{resumeFile.name}</p>
                                        <p className='dropzone__subtitle'>{formatFileSize(resumeFile.size)} selected</p>
                                    </>
                                ) : (
                                    <>
                                        <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                        <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                    </>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf,.docx'
                                    onChange={handleResumeChange}
                                />
                            </label>
                            {resumeFile && (
                                <button type='button' className='remove-file' onClick={clearResume}>
                                    Remove selected file
                                </button>
                            )}
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => {
                                    setSelfDescription(e.target.value)
                                    setFormError("")
                                }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {formError && (
                    <div className='form-error' role='alert' aria-live='assertive'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                            <circle cx='12' cy='12' r='10' />
                            <line x1='12' y1='8' x2='12' y2='12' />
                            <line x1='12' y1='16' x2='12.01' y2='16' />
                        </svg>
                        <p>{formError}</p>
                    </div>
                )}

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id}>
                                <button
                                    type='button'
                                    className='report-item'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home