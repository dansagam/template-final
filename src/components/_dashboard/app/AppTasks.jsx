/* eslint-disable no-console */
import PropTypes from 'prop-types'
import { Form, useFormik, FormikProvider } from 'formik'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'

// const TASKS = [
//    'Create FireStone Logo',
//    'Add SCSS and JS files if required',
//    'Stakeholder Meeting',
//    'Scoping & Estimations',
//    'Sprint Showcase',
// ]

const TaskItem = (props) => {
   const { task, checked, formik, ...other } = props
   const { getFieldProps, handleChange } = formik

   return (
      <Stack>
         <FormControlLabel
            control={
               <Checkbox
                  {...getFieldProps('checked')}
                  value={task}
                  checked={checked}
                  onChange={handleChange}
                  {...other}
               />
            }
            label={
               <Typography
                  variant="body2"
                  sx={{
                     ...(checked && {
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                     }),
                  }}
               >
                  {task}
               </Typography>
            }
         />
      </Stack>
   )
}
TaskItem.propTypes = {
   task: PropTypes.string,
   checked: PropTypes.bool,
   formik: PropTypes.object,
}

const AppTasks = (props) => {
   const { TASKS } = props
   const formik = useFormik({
      initialValues: {
         checked: [TASKS[1]],
      },
      onSubmit: (values) => {
         console.log(values)
      },
   })
   const { values, handleSubmit } = formik
   console.log(values)
   return (
      <Card>
         <CardHeader title="Tasks" />
         <Box sx={{ px: 3, py: 1 }}>
            <FormikProvider value={formik}>
               <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  {TASKS.map((task) => (
                     <TaskItem
                        key={task}
                        task={task}
                        formik={formik}
                        checked={values.checked.includes(task)}
                     />
                  ))}
               </Form>
            </FormikProvider>
         </Box>
      </Card>
   )
}
AppTasks.propTypes = {
   TASKS: PropTypes.array,
}

export default AppTasks
