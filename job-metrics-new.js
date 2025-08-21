// Career Path Explorer JavaScript
class CareerPathExplorer {
    constructor() {
        this.currentStep = 1;
        this.selectedPath = '';
        this.selectedIndustry = '';
        this.selectedEducation = '';
        this.selectedSpecialization = '';
        this.selectedRole = '';
        
        this.initializeEventListeners();
        this.initializeChart();
    }

    initializeEventListeners() {
        // Step 1: Path selection
        document.querySelectorAll('.path-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const path = e.currentTarget.dataset.path;
                this.selectPath(path);
            });
        });

        // Step 2: Industry selection
        document.querySelectorAll('.industry-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const industry = e.currentTarget.dataset.industry;
                this.selectIndustry(industry);
            });
        });

        // Step 3: Technology options
        document.querySelectorAll('.tech-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const option = e.currentTarget.dataset.option;
                this.selectTechOption(option);
            });
        });

        // Step 4: Education selection
        document.querySelectorAll('.education-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const education = e.currentTarget.dataset.education;
                this.selectEducation(education);
            });
        });

        // Step 5: Specialization selection
        document.querySelectorAll('.specialization-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const specialization = e.currentTarget.dataset.specialization;
                this.selectSpecialization(specialization);
            });
        });

        // Step 6: Role selection
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const role = e.currentTarget.dataset.role;
                this.selectRole(role);
            });
        });
    }

    selectPath(path) {
        this.selectedPath = path;
        this.updateBreadcrumb('Choose Path > ' + this.formatText(path));
        
        if (path === 'industry') {
            this.goToStep(2);
        } else if (path === 'education') {
            this.goToStep(4);
        } else if (path === 'role') {
            // Direct role selection - could implement later
            this.goToStep(6);
        }
    }

    selectIndustry(industry) {
        this.selectedIndustry = industry;
        this.updateBreadcrumb('Choose Path > Industry > ' + this.formatText(industry));
        
        if (industry === 'technology') {
            this.goToStep(3);
        } else {
            // For other industries, could implement specific flows
            this.showMessage('Career paths for ' + this.formatText(industry) + ' coming soon!');
        }
    }

    selectTechOption(option) {
        this.updateBreadcrumb('Choose Path > Industry > Technology > ' + this.formatText(option));
        
        if (option === 'education') {
            this.goToStep(4);
        } else if (option === 'role') {
            this.goToStep(6);
        }
    }

    selectEducation(education) {
        this.selectedEducation = education;
        this.updateBreadcrumb('Choose Path > Industry > Technology > Education > ' + this.formatText(education));
        
        if (education === 'btech') {
            this.goToStep(5);
        } else {
            // For other education types, could implement specific flows
            this.showMessage('Specializations for ' + this.formatText(education) + ' coming soon!');
        }
    }

    selectSpecialization(specialization) {
        this.selectedSpecialization = specialization;
        this.updateBreadcrumb('Choose Path > Industry > Technology > Education > B.Tech > ' + this.formatText(specialization));
        
        if (specialization === 'computer-science') {
            this.goToStep(6);
        } else {
            // For other specializations, could implement specific flows
            this.showMessage('Roles for ' + this.formatText(specialization) + ' coming soon!');
        }
    }

    selectRole(role) {
        this.selectedRole = role;
        this.updateBreadcrumb('Choose Path > Industry > Technology > Education > B.Tech > Computer Science > ' + this.formatText(role));
        
        // Update role details
        this.updateRoleDetails(role);
        this.goToStep(7);
    }

    goToStep(stepNumber) {
        // Hide current step
        document.querySelectorAll('.explorer-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show target step
        const targetStep = document.getElementById(`step${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
            this.currentStep = stepNumber;
            this.updateProgressIndicator(stepNumber);
        }

        // Scroll to career explorer section instead of top
        const careerExplorer = document.querySelector('.career-explorer');
        if (careerExplorer) {
            careerExplorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateProgressIndicator(step) {
        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            if (index < step) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateBreadcrumb(text) {
        const breadcrumb = document.getElementById('breadcrumbNav');
        breadcrumb.innerHTML = text.split(' > ').map((item, index, array) => {
            const isLast = index === array.length - 1;
            return `<span class="breadcrumb-item ${isLast ? 'active' : ''}">${item}</span>`;
        }).join('<i class="fas fa-chevron-right"></i>');
    }

    updateRoleDetails(role) {
        const roleData = this.getRoleData(role);
        
        // Update title
        document.getElementById('roleTitle').textContent = roleData.title;
        
        // Update job description
        document.getElementById('jobDescription').innerHTML = roleData.description;
        
        // Update technical skills
        const technicalSkillsContainer = document.getElementById('technicalSkills');
        technicalSkillsContainer.innerHTML = roleData.technicalSkills.map(skill => `
            <div class="skill-item">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}</span>
            </div>
        `).join('');
        
        // Update soft skills
        const softSkillsContainer = document.getElementById('softSkills');
        softSkillsContainer.innerHTML = roleData.softSkills.map(skill => `
            <div class="skill-item">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}</span>
            </div>
        `).join('');

        // Update chart (legacy, if present)
        this.updateSkillChart(roleData.chartData);
        // Render Gantt plan
        this.renderDefaultGantt();
    }

    getRoleData(role) {
        const roleDatabase = {
            'software-developer': {
                title: 'Software Developer',
                description: `
                    <p>Software Developers design, create, and maintain software applications and systems. They work with programming languages, frameworks, and tools to build solutions that meet user needs and business requirements.</p>
                    
                    <h4>Key Responsibilities:</h4>
                    <ul>
                        <li>Write clean, efficient, and maintainable code</li>
                        <li>Design and develop software applications</li>
                        <li>Debug and troubleshoot software issues</li>
                        <li>Collaborate with cross-functional teams</li>
                        <li>Participate in code reviews and testing</li>
                        <li>Stay updated with latest technologies and trends</li>
                    </ul>
                    
                    <h4>Work Environment:</h4>
                    <p>Software developers typically work in office environments or remotely, often collaborating with teams of other developers, designers, and project managers. The role requires both independent problem-solving and team collaboration.</p>
                `,
                technicalSkills: [
                    { name: 'Programming Languages (Java, Python, JavaScript)', level: 'Essential' },
                    { name: 'Data Structures & Algorithms', level: 'Essential' },
                    { name: 'Version Control (Git)', level: 'Essential' },
                    { name: 'Database Management (SQL)', level: 'Important' },
                    { name: 'Web Technologies (HTML, CSS, JS)', level: 'Important' },
                    { name: 'Testing & Debugging', level: 'Important' },
                    { name: 'Gen AI (Prompt Engineering, LLMs, AI APIs)', level: 'Important' },
                    { name: 'API Development', level: 'Useful' },
                    { name: 'Cloud Platforms (AWS, Azure)', level: 'Useful' }
                ],
                softSkills: [
                    { name: 'Problem Solving', level: 'Essential' },
                    { name: 'Communication', level: 'Essential' },
                    { name: 'Team Collaboration', level: 'Essential' },
                    { name: 'Continuous Learning', level: 'Important' },
                    { name: 'Time Management', level: 'Important' },
                    { name: 'Attention to Detail', level: 'Important' },
                    { name: 'Creativity', level: 'Useful' },
                    { name: 'Leadership', level: 'Useful' }
                ],
                chartData: {
                    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                    datasets: [
                        {
                            label: 'Programming Skills',
                            data: [20, 40, 60, 75, 85, 95],
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Problem Solving',
                            data: [15, 30, 50, 70, 80, 90],
                            borderColor: '#2196F3',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Project Experience',
                            data: [5, 15, 35, 55, 75, 90],
                            borderColor: '#FF9800',
                            backgroundColor: 'rgba(255, 152, 0, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Industry Knowledge',
                            data: [10, 20, 40, 60, 75, 85],
                            borderColor: '#9C27B0',
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            tension: 0.4
                        }
                    ]
                }
            },
            'software-engineer': {
                title: 'Software Engineer',
                description: `
                    <p>Software Engineers apply engineering principles to design, develop, and maintain large-scale software systems. They focus on system architecture, scalability, and engineering best practices.</p>
                    
                    <h4>Key Responsibilities:</h4>
                    <ul>
                        <li>Design scalable software architectures</li>
                        <li>Implement complex software systems</li>
                        <li>Optimize system performance and reliability</li>
                        <li>Lead technical design discussions</li>
                        <li>Mentor junior developers</li>
                        <li>Ensure code quality and best practices</li>
                    </ul>
                `,
                technicalSkills: [
                    { name: 'System Design & Architecture', level: 'Essential' },
                    { name: 'Advanced Programming', level: 'Essential' },
                    { name: 'Database Design', level: 'Essential' },
                    { name: 'Performance Optimization', level: 'Important' },
                    { name: 'DevOps & CI/CD', level: 'Important' },
                    { name: 'Microservices Architecture', level: 'Important' }
                ],
                softSkills: [
                    { name: 'Technical Leadership', level: 'Essential' },
                    { name: 'System Thinking', level: 'Essential' },
                    { name: 'Mentoring', level: 'Important' },
                    { name: 'Communication', level: 'Important' },
                    { name: 'Decision Making', level: 'Important' }
                ],
                chartData: {
                    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                    datasets: [
                        {
                            label: 'System Design',
                            data: [25, 45, 65, 80, 90, 95],
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Architecture Skills',
                            data: [20, 40, 60, 75, 85, 92],
                            borderColor: '#2196F3',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            tension: 0.4
                        }
                    ]
                }
            }
            // Add more roles as needed
        };

        return roleDatabase[role] || roleDatabase['software-developer'];
    }

    initializeChart() {
        // Chart removed in favor of Gantt; keep no-op to avoid errors
        this.skillChart = null;
    }

    updateSkillChart(chartData) {
        // No-op: legacy function retained for compatibility
    }

    renderDefaultGantt() {
        const container = document.getElementById('ganttRows');
        if (!container) return;

        const rows = [
            { skill: 'Programming Languages', months: [1,2], details: { 1: 'Syntax, variables, control flow; setup IDE', 2: 'OOP, modules/packages, error handling' } },
            { skill: 'Data Structures & Algorithms', months: [1,2,3], details: { 1: 'Arrays, strings, hash maps basics', 2: 'Stacks, queues, linked lists', 3: 'Sorting, searching, Big-O basics' } },
            { skill: 'Version Control (Git)', months: [1], details: { 1: 'git init/clone, add/commit, branch, merge, PRs' } },
            { skill: 'Database Management', months: [3,4], details: { 3: 'SQL CRUD, constraints, indexing basics', 4: 'Joins, normalization, transactions' } },
            { skill: 'Web Technologies', months: [3,4], details: { 3: 'HTML semantics, CSS layout (Flex/Grid)', 4: 'JavaScript DOM, fetch API' } },
            { skill: 'Testing & Debugging', months: [5], details: { 5: 'Unit testing (e.g., Jest/PyTest), debugging tools' } },
            { skill: 'Gen AI (Prompt Engineering, LLMs, AI APIs)', months: [5,6], details: { 5: 'Prompt patterns, token limits, model basics', 6: 'Integrate LLM APIs, safety, evaluation' } }
        ];

        container.innerHTML = rows.map(r => this.renderGanttRow(r)).join('');
        this.attachGanttTooltips();
    }

    renderGanttRow(row) {
        // Build 6 month cells, mark active ones
        const cells = [];
        for (let m = 1; m <= 6; m++) {
            const active = row.months.includes(m);
            const detail = (row.details && row.details[m]) ? row.details[m] : `${row.skill} focus`;
            const cls = active ? 'active' : '';
            const detailAttr = active ? ` data-detail="${detail.replace(/"/g, '&quot;')}"` : '';
            cells.push(`<div class="gantt-cell ${cls}"${detailAttr}></div>`);
        }
        return `
            <div class="gantt-row">
                <div class="gantt-cell gantt-skill-col">${row.skill}</div>
                ${cells.join('')}
            </div>
        `;
    }

    attachGanttTooltips() {
        let tooltip = document.getElementById('ganttTooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'ganttTooltip';
            tooltip.className = 'gantt-tooltip';
            document.body.appendChild(tooltip);
        }
        const cells = document.querySelectorAll('.gantt-cell.active');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', (e) => {
                const text = e.currentTarget.getAttribute('data-detail') || '';
                tooltip.textContent = text;
                tooltip.style.display = 'block';
            });
            cell.addEventListener('mousemove', (e) => {
                const pad = 12;
                tooltip.style.left = (e.pageX + pad) + 'px';
                tooltip.style.top = (e.pageY + pad) + 'px';
            });
            cell.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    formatText(text) {
        return text.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    showMessage(message) {
        // Create a simple modal or alert
        alert(message);
    }
}

// Global function for back buttons
function goToStep(stepNumber) {
    if (window.careerExplorer) {
        window.careerExplorer.goToStep(stepNumber);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.careerExplorer = new CareerPathExplorer();
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.path-card, .industry-card, .tech-card, .education-card, .specialization-card, .role-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});